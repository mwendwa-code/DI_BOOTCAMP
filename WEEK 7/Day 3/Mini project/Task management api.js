const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3021;
const filePath = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf8');
}

app.use(express.json());

const readTasks = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8');
};

app.get('/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error reading tasks', error: error.message });
  }
});

app.get('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((item) => item.id === Number(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error reading task', error: error.message });
  }
});

app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const tasks = readTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: title.trim(),
      description: description || '',
      completed: Boolean(completed)
    };

    tasks.push(newTask);
    writeTasks(tasks);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ message: 'Title must be a non-empty string' });
  }

  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === Number(req.params.id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title !== undefined ? title.trim() : tasks[taskIndex].title,
      description: description !== undefined ? description : tasks[taskIndex].description,
      completed: completed !== undefined ? Boolean(completed) : tasks[taskIndex].completed
    };

    writeTasks(tasks);
    return res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

app.delete('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === Number(req.params.id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Task management app running on http://localhost:${PORT}`);
});
