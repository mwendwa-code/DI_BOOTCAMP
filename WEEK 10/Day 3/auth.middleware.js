const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('./tokenStore');

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      return res.status(401).json({ error: 'Invalid access token.' });
    }

    req.authenticatedUserId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired access token.' });
  }
}

module.exports = { authenticateToken };