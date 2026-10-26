import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.header("Authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;

  if (!token) {
    res.status(401).json({ message: "Authentication is required." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }
    const payload = jwt.verify(token, secret);
    if (
      typeof payload === "string" ||
      typeof (payload as JwtPayload).userId !== "number"
    ) {
      res.status(401).json({ message: "Invalid or expired access token." });
      return;
    }
    req.userId = (payload as JwtPayload & { userId: number }).userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired access token." });
  }
}
