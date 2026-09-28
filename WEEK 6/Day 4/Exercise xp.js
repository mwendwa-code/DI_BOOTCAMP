const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const chalk = require('chalk');

// ==========================================
// 🌟 Exercise 1: Products Search (CommonJS)
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 1: Products Search ---'));

const products = [
  { name: 'Laptop', price: 1200, category: 'Electronics' },
  { name: 'Phone', price: 800, category: 'Electronics' },
  { name: 'Desk', price: 250, category: 'Furniture' },
  { name: 'Book', price: 15, category: 'Stationery' }
];

function findProductByName(productName) {
  const product = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (product) {
    console.log(`Found "${productName}":`, product);
  } else {
    console.log(`Product "${productName}" not found.`);
  }
}

findProductByName('Laptop');
findProductByName('Book');
findProductByName('Headphones');

// ==========================================
// 🌟 Exercise 2: People Average Age
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 2: Average Age Calculation ---'));

const people = [
  { name: 'Alice', age: 25, location: 'New York' },
  { name: 'Bob', age: 30, location: 'London' },
  { name: 'Charlie', age: 35, location: 'Paris' },
  { name: 'Diana', age: 22, location: 'Tokyo' }
];

function calculateAverageAge(personsArray) {
  if (personsArray.length === 0) return 0;
  const totalAge = personsArray.reduce((sum, person) => sum + person.age, 0);
  const averageAge = totalAge / personsArray.length;
  console.log(`Average Age of People: ${averageAge.toFixed(2)} years`);
  return averageAge;
}

calculateAverageAge(people);

// ==========================================
// 🌟 Exercise 3: File Management (Read/Write)
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 3: File Manager ---'));

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully wrote to "${filePath}"`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error.message);
  }
}

// Setup test files
fs.writeFileSync('Hello World.txt', 'Hello World !! ', 'utf8');
fs.writeFileSync('Bye World.txt', 'Bye World !! ', 'utf8');

// Perform operations
const helloContent = readFile('Hello World.txt');
console.log(`Read from "Hello World.txt": ${helloContent.trim()}`);

writeFile('Bye World.txt', 'Writing to the file');

// Clean up created files
fs.unlinkSync('Hello World.txt');
fs.unlinkSync('Bye World.txt');

// ==========================================
// 🌟 Exercise 4: Todo List Class
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 4: Todo List ---'));

class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ id: Date.now(), task, completed: false });
    console.log(`Added task: "${task}"`);
  }

  markComplete(taskIndex) {
    if (this.tasks[taskIndex]) {
      this.tasks[taskIndex].completed = true;
      console.log(`Completed task: "${this.tasks[taskIndex].task}"`);
    }
  }

  listTasks() {
    console.log('\nTask List:');
    this.tasks.forEach((item, index) => {
      const status = item.completed ? '[✔]' : '[ ]';
      console.log(`  ${index + 1}. ${status} ${item.task}`);
    });
  }
}

const myTodoList = new TodoList();
myTodoList.addTask('Buy groceries');
myTodoList.addTask('Complete Node.js exercises');
myTodoList.addTask('Go for a run');
myTodoList.markComplete(1);
myTodoList.listTasks();

// ==========================================
// 🌟 Exercise 5: Custom Math Module & Lodash
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 5: Math & Lodash ---'));

const customMath = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

const sum = customMath.add(10, 20);
const product = customMath.multiply(5, 4);

console.log(`Addition (10 + 20): ${sum}`);
console.log(`Multiplication (5 * 4): ${product}`);

const numbers = [10, 20, 30, 40, 50];
console.log(`Lodash Mean of [${numbers.join(', ')}]:`, lodash.mean(numbers));
console.log(`Lodash Sum of [${numbers.join(', ')}]:`, lodash.sum(numbers));

// ==========================================
// 🌟 Exercise 6: Chalk Package Styling
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 6: Chalk Output ---'));

console.log(chalk.blue('This is a simple blue message.'));
console.log(chalk.bold.green('Success: All tasks completed successfully!'));
console.log(chalk.red.underline('Error: Critical issue detected!'));
console.log(chalk.yellow.bgBlack(' Warning: Check system configuration. '));

// ==========================================
// 🌟 Exercise 7: Reading & Copying Files
// ==========================================
console.log(chalk.bold.yellow('\n--- EXERCISE 7: Copy & Read Directory ---'));

// Setup source file
fs.writeFileSync('source.txt', 'This is content from source.txt', 'utf8');

// Copy file
try {
  const content = fs.readFileSync('source.txt', 'utf8');
  fs.writeFileSync('destination.txt', content, 'utf8');
  console.log('Successfully copied "source.txt" to "destination.txt".');
} catch (error) {
  console.error('Error copying file:', error.message);
}

// Read current directory contents
console.log('\nFiles in current directory:');
const files = fs.readdirSync('.');
files.forEach((file) => console.log(`  - ${file}`));

// Clean up temporary copy files
fs.unlinkSync('source.txt');
fs.unlinkSync('destination.txt');