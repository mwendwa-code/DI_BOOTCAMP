const express = require('express');
const todoRoutes = require('./server/routes/todoRoutes');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/api', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
