const express = require('express');
const postRoutes = require('./server/routes/posts');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
});
