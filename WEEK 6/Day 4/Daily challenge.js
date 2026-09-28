const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// ==========================================
// Task 1: Basic Module System
// ==========================================
function greet(name) {
  return `Hello, ${name}! Welcome to Node.js.`;
}

// ==========================================
// Task 2: Using an NPM Module (Chalk)
// ==========================================
function displayColorfulMessage() {
  const message = chalk.bold.cyan('🌟 This is a bright and colorful message from Chalk! 🌟');
  console.log(message);
}

// ==========================================
// Task 3: Advanced File Operations
// ==========================================
function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('File Content:\n' + data);
  } catch (error) {
    console.error('Error reading file:', error.message);
  }
}

// ==========================================
// Challenge Task: Integrating Everything
// ==========================================
function runChallenge() {
  console.log('=============== DAILY CHALLENGE ===============\n');

  // 1. Greet User
  const greetingMsg = greet('Developer');
  console.log(greetingMsg);
  console.log('-----------------------------------------------');

  // 2. Display Colorful Message
  displayColorfulMessage();
  console.log('-----------------------------------------------');

  // 3. Read and Display File Content
  readFileContent();

  console.log('\n===============================================');
}

// Execute the combined challenge
runChallenge();