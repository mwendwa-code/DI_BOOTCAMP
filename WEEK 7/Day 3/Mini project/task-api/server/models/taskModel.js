const { readTasks, writeTasks } = require('../config/fileStore');

const getAllTasks = () => readTasks();

const getTaskById = (id) => {
  const tasks = readTasks();
  return tasks.find((task) => task.id === Number(id));
};

const createTask = (task) => {
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
  return task;
};

const updateTask = (id, updatedTask) => {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...updatedTask };
  writeTasks(tasks);
  return tasks[index];
};

const deleteTask = (id) => {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index === -1) return null;

  const [deletedTask] = tasks.splice(index, 1);
  writeTasks(tasks);
  return deletedTask;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
