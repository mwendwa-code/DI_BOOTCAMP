const express = require('express');
const {
  listTasks,
  getOneTask,
  addTask,
  updateOneTask,
  removeTask
} = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', listTasks);
router.get('/tasks/:id', getOneTask);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateOneTask);
router.delete('/tasks/:id', removeTask);

module.exports = router;
