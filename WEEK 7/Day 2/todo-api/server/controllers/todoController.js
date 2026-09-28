const { tasks } = require('../models/todoModel');

const getNextId = () => (tasks.length ? tasks[tasks.length - 1].id + 1 : 1);

const getAllTodos = (req, res) => {
  res.status(200).json(tasks);
};

const getTodoById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Todo id must be a valid integer' });
  }

  const todo = tasks.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  return res.status(200).json(todo);
};

const createTodo = (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: getNextId(),
    title: title.trim(),
    completed: Boolean(completed)
  };

  tasks.push(newTodo);
  return res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Todo id must be a valid integer' });
  }

  const todoIndex = tasks.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (title === undefined && completed === undefined) {
    return res.status(400).json({ message: 'Provide a title or completed status to update' });
  }

  tasks[todoIndex] = {
    ...tasks[todoIndex],
    title: title !== undefined ? title.trim() : tasks[todoIndex].title,
    completed: completed !== undefined ? Boolean(completed) : tasks[todoIndex].completed
  };

  return res.status(200).json(tasks[todoIndex]);
};

const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Todo id must be a valid integer' });
  }

  const todoIndex = tasks.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const [deletedTodo] = tasks.splice(todoIndex, 1);
  return res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo });
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
