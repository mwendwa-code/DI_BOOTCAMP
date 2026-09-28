const express = require('express');

const app = express();
const PORT = 3014;

const tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build CRUD routes', completed: true }
];

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    completed: Boolean(completed)
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, completed } = req.body;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title !== undefined ? title.trim() : tasks[taskIndex].title,
    completed: completed !== undefined ? Boolean(completed) : tasks[taskIndex].completed
  };

  return res.status(200).json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Todo API single-file app running on http://localhost:${PORT}`);
});
