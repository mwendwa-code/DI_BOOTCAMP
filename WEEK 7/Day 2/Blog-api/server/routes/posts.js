const express = require('express');
const router = express.Router();

const posts = [];

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
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
  const postId = Number(req.params.id);
  const postIndex = posts.findIndex((item) => item.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ message: 'At least one field is required' });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title ?? posts[postIndex].title,
    content: content ?? posts[postIndex].content
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

module.exports = router;
