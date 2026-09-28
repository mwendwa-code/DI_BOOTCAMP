const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3011;

const users = [
  {
    id: 1,
    email: 'admin@example.com',
    username: 'admin',
    first_name: 'Admin',
    last_name: 'User'
  }
];

const hashpwd = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$2Q7bQ6H3Zwr.mGd4ne7i4OZ3p5Jjv8o60E7n9dS2w4Q8n5Y6xk7W2'
  }
];

app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;

  if (!email || !username || !first_name || !last_name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
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

    users.push(newUser);
    hashpwd.push({
      id: hashpwd.length ? hashpwd[hashpwd.length - 1].id + 1 : 1,
      username,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find((item) => item.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const storedHash = hashpwd.find((item) => item.username === username);
  if (!storedHash) {
    return res.status(404).json({ message: 'Password record not found' });
  }

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
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { email, username, first_name, last_name } = req.body;

  if (email !== undefined) user.email = email;
  if (username !== undefined) user.username = username;
  if (first_name !== undefined) user.first_name = first_name;
  if (last_name !== undefined) user.last_name = last_name;

  return res.status(200).json({ message: 'User updated successfully', user });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Registration and login app running on http://localhost:${PORT}`);
});
