const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your full name: ', (name) => {
  const pattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  if (pattern.test(name)) {
    console.log('Valid name');
  } else {
    console.log('Invalid name. Use: Firstname Lastname with only letters and one space.');
  }

  rl.close();
});
