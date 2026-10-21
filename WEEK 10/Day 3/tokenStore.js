const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Set ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET before starting the app.');
}

const activeRefreshTokens = new Map();

function addRefreshToken(tokenId, userId) {
  activeRefreshTokens.set(tokenId, userId);
}

function consumeRefreshToken(tokenId, userId) {
  if (activeRefreshTokens.get(tokenId) !== userId) return false;
  activeRefreshTokens.delete(tokenId);
  return true;
}

module.exports = {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  addRefreshToken,
  consumeRefreshToken,
};