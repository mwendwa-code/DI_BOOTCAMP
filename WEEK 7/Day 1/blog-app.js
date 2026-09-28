const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const port = 3001;

app.use(express.json());
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`Blog API running on http://localhost:${port}`);
});
