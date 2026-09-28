const express = require('express');
const userRoutes = require('./server/routes/userRoutes');

const app = express();
const PORT = 3010;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'User Management API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`User API running on http://localhost:${PORT}`);
});
