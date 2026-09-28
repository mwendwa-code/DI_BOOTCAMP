const express = require('express');
const taskRoutes = require('./server/routes/taskRoutes');

const app = express();
const PORT = 3020;

app.use(express.json());
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Task API running on http://localhost:${PORT}`);
});
