export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(taskName) {
    this.tasks.push({ task: taskName, completed: false });
  }

  markTaskComplete(taskName) {
    const task = this.tasks.find(item => item.task === taskName);
    if (task) {
      task.completed = true;
    }
  }

  listTasks() {
    console.log('Todo List:');
    this.tasks.forEach((task, index) => {
      const status = task.completed ? 'Completed' : 'Pending';
      console.log(`${index + 1}. ${task.task} - ${status}`);
    });
  }
}
