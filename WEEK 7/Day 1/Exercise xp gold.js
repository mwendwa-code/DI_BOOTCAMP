const express = require('express');
const app = express();
const router = express.Router();

const posts = [];

app.use(express.json());

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  const postIndex = posts.findIndex((item) => item.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (!title && !content) {
    return res.status(400).json({ message: 'Provide at least title or content to update' });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title ?? posts[postIndex].title,
    content: content ?? posts[postIndex].content,
    timestamp: new Date().toISOString()
  };

  res.json(posts[postIndex]);
});

router.delete('/:id', (req, res) => {
  const postId = Number(req.params.id);
  const postIndex = posts.findIndex((item) => item.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const [deletedPost] = posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully', post: deletedPost });
});

app.use('/posts', router);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Blog API is running on http://localhost:${PORT}`);
});
