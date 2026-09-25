import { TodoList } from './todo.js';

const todoList = new TodoList();

todoList.addTask('Learn Node.js');
todoList.addTask('Complete JS exercises');
todoList.addTask('Review project structure');

todoList.markTaskComplete('Learn Node.js');

todoList.listTasks();
