export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  markComplete(index) {
    if (this.tasks[index]) {
      this.tasks[index].completed = true;
    } else {
      console.log('Task index out of bounds');
    }
  }

  listTasks() {
    console.log('\n--- Todo List ---');
    this.tasks.forEach((item, idx) => {
      const status = item.completed ? '[X]' : '[ ]';
      console.log(`${idx + 1}. ${status} ${item.task}`);
    });
  }
}