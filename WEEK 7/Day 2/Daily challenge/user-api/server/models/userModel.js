const { users, hashpwd } = require('../config/db');

const findUserByUsername = (username) => users.find((user) => user.username === username);
const findUserById = (id) => users.find((user) => user.id === Number(id));

const addUserRecord = (user) => {
  users.push(user);
};

const addHashRecord = (hashedUser) => {
  hashpwd.push(hashedUser);
};

const getAllUsers = () => users;

module.exports = {
  users,
  hashpwd,
  findUserByUsername,
  findUserById,
  addUserRecord,
  addHashRecord,
  getAllUsers
};
