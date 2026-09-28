const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { addDays, format } = require('date-fns');
const { faker } = require('@faker-js/faker');
const readline = require('readline-sync');

// ==========================================
// Exercise 1: File Management & Path Manipulation
// ==========================================
console.log('=== Exercise 1: File Management ===');

function runExercise1() {
  // Ensure directory and sample file exist
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, 'example.txt');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Sample text content for Exercise 1.', 'utf8');
  }

  // Check file status
  const exists = fs.existsSync(filePath);
  console.log(`File Exists: ${exists}`);

  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`File Size: ${stats.size} bytes`);
    console.log(`Creation Time: ${stats.birthtime}`);
  }
}

runExercise1();

// ==========================================
// Exercise 2: Fetching Data with Axios
// ==========================================
console.log('\n=== Exercise 2: Fetch Data with Axios ===');

async function fetchPostTitles() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.slice(0, 5); // Displaying first 5 post titles for brevity
    
    console.log('Fetched Post Titles:');
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title}`);
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

// ==========================================
// Exercise 3: Working with Dates (date-fns)
// ==========================================
console.log('\n=== Exercise 3: Working with Dates ===');

function performDateOperations() {
  const now = new Date();
  const futureDate = addDays(now, 5);
  const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');

  console.log(`Current Date: ${now.toString()}`);
  console.log(`Formatted Date (Current + 5 Days): ${formattedDate}`);
}

performDateOperations();

// ==========================================
// Exercise 4: Faker Module & User Prompt
// ==========================================
console.log('\n=== Exercise 4: Faker Module ===');

const users = [];

function addFakeUser() {
  users.push({
    name: faker.person.fullName(),
    addressStreet: faker.location.streetAddress(),
    country: faker.location.country()
  });
}

// Add 2 fake users
addFakeUser();
addFakeUser();

console.log('Generated Users:', users);

// ==========================================
// Exercise 5: Regular Expression #1 (Extract Numbers)
// ==========================================
console.log('\n=== Exercise 5: Regular Expression #1 ===');

function returnNumbers(str) {
  const matches = str.match(/\d/g);
  return matches ? matches.join('') : '';
}

const extractedDigits = returnNumbers('k5k3q2g5z6x9bn');
console.log(`Extracted Numbers from 'k5k3q2g5z6x9bn': ${extractedDigits}`); // Output: 532569

// ==========================================
// Exercise 6: Regular Expression #2 (Name Validation)
// ==========================================
console.log('\n=== Exercise 6: Regular Expression #2 ===');

function validateFullName(input) {
  // Regex: 2 words, each starting with an uppercase letter followed by lowercase letters, exactly 1 space
  const namePattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;

  if (namePattern.test(input)) {
    console.log(`✅ "${input}" is a valid full name.`);
  } else {
    console.log(`❌ "${input}" is invalid. Name must consist of two capitalized words separated by a single space.`);
  }
}

// Interactive prompt for user input
const userInput = readline.question('Enter full name to validate (e.g., John Doe): ');
validateFullName(userInput);

// Execute asynchronous Exercise 2 at the end
fetchPostTitles();