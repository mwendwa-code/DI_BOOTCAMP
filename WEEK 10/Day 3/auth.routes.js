const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { rateLimit } = require('express-rate-limit');
const { randomUUID } = require('node:crypto');
const { createUser, getUserByUsername, toPublicUser } = require('./userStore');
const { authenticateToken } = require('./auth.middleware');
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  addRefreshToken,
  consumeRefreshToken,
} = require('./tokenStore');

const router = express.Router();
const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
});

function setAuthCookies(res, userId) {
  const accessToken = jwt.sign({ sub: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL_SECONDS,
  });
  const refreshTokenId = randomUUID();
  const refreshToken = jwt.sign({ sub: userId, jti: refreshTokenId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL_SECONDS,
  });

  addRefreshToken(refreshTokenId, userId);
  res.cookie('access_token', accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_TTL_SECONDS * 1000,
    path: '/',
  });
  res.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_TTL_SECONDS * 1000,
    path: '/auth',
  });
}

function clearAuthCookies(res) {
  res.clearCookie('access_token', { ...cookieOptions, path: '/' });
  res.clearCookie('refresh_token', { ...cookieOptions, path: '/auth' });
}

function validateCredentials(username, password) {
  return typeof username === 'string'
    && /^[a-zA-Z0-9_]{3,24}$/.test(username)
    && typeof password === 'string'
    && password.length >= 10
    && Buffer.byteLength(password, 'utf8') <= 72;
}

router.post('/register', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!validateCredentials(username, password)) {
    return res.status(400).json({
      error: 'Username must be 3-24 letters, numbers, or underscores. Password must be 10-72 bytes.',
    });
  }

  if (getUserByUsername(username)) {
    return res.status(409).json({ error: 'Username is already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = createUser(username, passwordHash);
  setAuthCookies(res, user.id);

  return res.status(201).json({ user: toPublicUser(user) });
});

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = getUserByUsername(username);
  const passwordMatches = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  setAuthCookies(res, user.id);
  return res.json({ user: toPublicUser(user) });
});

router.get('/me', authenticateToken, (req, res) => {
  const user = require('./userStore').getUserById(req.authenticatedUserId);

  if (!user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  return res.json({ user: toPublicUser(user) });
});

router.post('/refresh', loginLimiter, (req, res) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res.status(401).json({ error: 'Refresh token required.' });
  }

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof payload === 'string'
      || typeof payload.sub !== 'string'
      || typeof payload.jti !== 'string'
      || !consumeRefreshToken(payload.jti, payload.sub)) {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Refresh token is invalid or expired.' });
    }

    setAuthCookies(res, payload.sub);
    return res.json({ message: 'Tokens refreshed.' });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ error: 'Refresh token is invalid or expired.' });
  }
});

router.post('/logout', (req, res) => {
  const token = req.cookies.refresh_token;

  if (token) {
    try {
      const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

      if (typeof payload !== 'string' && typeof payload.jti === 'string') {
        consumeRefreshToken(payload.jti, payload.sub);
      }
    } catch {
      // Expired or malformed tokens are already unusable.
    }
  }

  clearAuthCookies(res);
  return res.status(204).end();
});

module.exports = router;