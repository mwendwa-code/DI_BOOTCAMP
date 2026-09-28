const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../models/taskModel');

const listTasks = (req, res) => {
  try {
    const tasks = getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error reading tasks', error: error.message });
  }
};

const getOneTask = (req, res) => {
  try {
    const task = getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error reading task', error: error.message });
  }
};

const addTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const tasks = getAllTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: title.trim(),
      description: description || '',
      completed: Boolean(completed)
    };

    const createdTask = createTask(newTask);
    return res.status(201).json(createdTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const updateOneTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ message: 'Title must be a non-empty string' });
  }

  try {
    const updated = updateTask(req.params.id, {
      title: title !== undefined ? title.trim() : undefined,
      description: description !== undefined ? description : undefined,
      completed: completed !== undefined ? Boolean(completed) : undefined
    });

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const removeTask = (req, res) => {
  try {
    const deletedTask = deleteTask(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  listTasks,
  getOneTask,
  addTask,
  updateOneTask,
  removeTask
};
