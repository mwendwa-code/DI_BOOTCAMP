const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'tasks.json');

const readTasks = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

module.exports = { readTasks, writeTasks };
