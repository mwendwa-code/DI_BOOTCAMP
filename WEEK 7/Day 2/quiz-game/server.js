const express = require('express');
const path = require('path');
const quizRoutes = require('./server/routes/quizRoutes');

const app = express();
const PORT = 3003;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', quizRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Quiz game running on http://localhost:${PORT}`);
});
