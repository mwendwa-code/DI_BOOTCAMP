const { randomUUID } = require('node:crypto');

const usersById = new Map();
const userIdsByUsername = new Map();

function normalizeUsername(username) {
  return username.toLowerCase();
}

function createUser(username, passwordHash) {
  const user = {
    id: randomUUID(),
    username,
    passwordHash,
    displayName: username,
  };

  usersById.set(user.id, user);
  userIdsByUsername.set(normalizeUsername(username), user.id);
  return user;
}

function getUserById(id) {
  return usersById.get(id);
}

function getUserByUsername(username) {
  const id = userIdsByUsername.get(normalizeUsername(username));
  return id ? getUserById(id) : undefined;
}

function updateDisplayName(id, displayName) {
  const user = getUserById(id);
  if (user) user.displayName = displayName;
  return user;
}

function toPublicUser(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
  };
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  toPublicUser,
  updateDisplayName,
};