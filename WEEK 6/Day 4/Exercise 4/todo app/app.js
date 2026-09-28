import { TodoList } from './todo.js';

const myTodo = new TodoList();

myTodo.addTask('Learn Node.js modules');
myTodo.addTask('Practice ES6 syntax');
myTodo.addTask('Complete Exercise XP');

myTodo.markComplete(0);

myTodo.listTasks();