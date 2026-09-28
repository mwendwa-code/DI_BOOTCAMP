const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const router = express.Router();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/', router);

function readUsersFile() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    throw new Error('Error reading users file');
  }
}

function writeUsersFile(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Error writing users file');
  }
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

router.post('/register', async (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const users = readUsersFile();
    const userExists = users.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      name,
      lastName,
      email,
      username,
      password: hashedPassword
    };

    users.push(newUser);
    writeUsersFile(users);

    return res.status(201).json({
      message: 'User registered successfully!'
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const users = readUsersFile();
    const user = users.find((item) => item.username === username);

    if (!user) {
      return res.status(401).json({ message: 'User not registered.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    return res.status(200).json({
      message: `Welcome ${user.name} ${user.lastName}! You are logged in.`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed.' });
  }
});

router.get('/users', (req, res) => {
  try {
    const users = readUsersFile();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch users.' });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    const users = readUsersFile();
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch user.' });
  }
});

router.put('/users/:id', (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required for update.' });
  }

  try {
    const users = readUsersFile();
    const index = users.findIndex((user) => user.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }

    users[index] = {
      ...users[index],
      name,
      lastName,
      email,
      username,
      password: bcrypt.hashSync(password, 10)
    };

    writeUsersFile(users);
    return res.json({ message: 'User updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to update user.' });
  }
});

app.listen(PORT, () => {
  console.log(`User API running on http://localhost:${PORT}`);
});
