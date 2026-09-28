const bcrypt = require('bcrypt');
const {
  users,
  hashpwd,
  findUserByUsername,
  findUserById,
  addUserRecord,
  addHashRecord,
  getAllUsers
} = require('../models/userModel');

const registerUser = async (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;

  if (!email || !username || !first_name || !last_name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const usernameExists = findUserByUsername(username);
  if (usernameExists) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      email,
      username,
      first_name,
      last_name
    };

    const newHashRecord = {
      id: hashpwd.length ? hashpwd[hashpwd.length - 1].id + 1 : 1,
      username,
      password: hashedPassword
    };

    addUserRecord(newUser);
    addHashRecord(newHashRecord);

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const storedHash = hashpwd.find((entry) => entry.username === username);
  if (!storedHash) {
    return res.status(404).json({ message: 'Password record not found' });
  }

  try {
    const isMatch = await bcrypt.compare(password, storedHash.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getUsers = (req, res) => {
  return res.status(200).json(users);
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

const updateUser = (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { email, username, first_name, last_name } = req.body;

  if (email !== undefined) user.email = email;
  if (username !== undefined) user.username = username;
  if (first_name !== undefined) user.first_name = first_name;
  if (last_name !== undefined) user.last_name = last_name;

  return res.status(200).json({ message: 'User updated successfully', user });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser
};
