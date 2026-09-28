const express = require('express');

const app = express();
const PORT = 3007;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express exercise app' });
});

app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Express!' });
});

app.post('/api/message', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Message is required' });
  }

  return res.status(201).json({ message: `You sent: ${message}` });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Exercise xp app running on http://localhost:${PORT}`);
});
