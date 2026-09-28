const express = require('express');
const router = express.Router();

const posts = [];

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: 'Title and content are required'
    });
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
  const { id } = req.params;
  const { title, content } = req.body;
  const postIndex = posts.findIndex((item) => item.id === Number(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (!title && !content) {
    return res.status(400).json({ message: 'At least one field is required to update' });
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
  const { id } = req.params;
  const postIndex = posts.findIndex((item) => item.id === Number(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const [deletedPost] = posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully', post: deletedPost });
});

module.exports = router;
