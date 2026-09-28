const express = require('express');

const app = express();
const PORT = 3016;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Exercise xp server is running' });
});

app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from the Express exercise!' });
});

app.post('/api/message', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Message is required' });
  }

  return res.status(201).json({ message: `You sent: ${message}` });
});

app.listen(PORT, () => {
  console.log(`Exercise xp server running on http://localhost:${PORT}`);
});
