import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";

const router = Router();
const refreshCookieName = "refreshToken";
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createTokens(userId: number): { accessToken: string; refreshToken: string } {
  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_SECRET;
  if (!accessSecret || !refreshSecret) {
    throw new Error("Authentication secrets are not configured.");
  }
  return {
    accessToken: jwt.sign({ userId }, accessSecret, { expiresIn: "15m" }),
    refreshToken: jwt.sign({ userId }, refreshSecret, { expiresIn: "7d" }),
  };
}

router.post("/register", async (req, res, next) => {
  const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if (!username || !email || !password) {
    res.status(400).json({ message: "Username, email, and password are required." });
    return;
  }
  if (username.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    res.status(400).json({ message: "Enter a valid username and email address." });
    return;
  }
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    res.status(400).json({ message: "Password must be between 8 and 72 characters." });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, passwordHash],
    );
    const user = result.rows[0] as { id: number; username: string; email: string };
    const tokens = createTokens(user.id);
    res.cookie(refreshCookieName, tokens.refreshToken, refreshCookieOptions);
    res.status(201).json({ accessToken: tokens.accessToken, user });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      res.status(409).json({ message: "An account with this email already exists." });
      return;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const result = await pool.query(
      "SELECT id, username, email, password_hash FROM users WHERE email = $1",
      [email],
    );
    const user = result.rows[0] as
      | { id: number; username: string; email: string; password_hash: string }
      | undefined;
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const tokens = createTokens(user.id);
    res.cookie(refreshCookieName, tokens.refreshToken, refreshCookieOptions);
    res.json({
      accessToken: tokens.accessToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies[refreshCookieName] as string | undefined;
  const refreshSecret = process.env.REFRESH_SECRET;
  if (!refreshToken || !refreshSecret) {
    res.status(401).json({ message: "Your session has expired. Please sign in again." });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, refreshSecret);
    if (typeof payload === "string" || typeof payload.userId !== "number") {
      res.status(401).json({ message: "Your session has expired. Please sign in again." });
      return;
    }
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [payload.userId],
    );
    const user = result.rows[0] as { id: number; username: string; email: string } | undefined;
    if (!user) {
      res.status(401).json({ message: "Your session has expired. Please sign in again." });
      return;
    }
    const tokens = createTokens(user.id);
    res.cookie(refreshCookieName, tokens.refreshToken, refreshCookieOptions);
    res.json({ accessToken: tokens.accessToken, user });
  } catch {
    res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie(refreshCookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
  });
  res.status(204).end();
});

router.get("/me", authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [req.userId],
    );
    if (!result.rows[0]) {
      res.status(404).json({ message: "User account not found." });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
