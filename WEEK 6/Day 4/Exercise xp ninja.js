const { program } = require('commander');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');

// Command 1: Greet
function greet(name = 'Developer') {
  console.log(chalk.bold.green(`Hello, ${name}! Welcome to the Ninja Utility CLI! 🚀`));
}

// Command 2: Fetch
async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(chalk.cyan.bold('--- Fetched Post Data ---'));
    console.log(chalk.yellow(`Title: ${response.data.title}`));
    console.log(chalk.white(`Body: ${response.data.body}`));
  } catch (error) {
    console.error(chalk.red(`Error fetching data: ${error.message}`));
  }
}

// Command 3: Read File
function readFileContent(filePath) {
  try {
    if (!filePath) {
      console.log(chalk.red('Please specify a file path.'));
      return;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(chalk.bold.magenta(`--- Content of ${filePath} ---`));
    console.log(data);
  } catch (error) {
    console.error(chalk.red(`Error reading file: ${error.message}`));
  }
}

// Commander Program Setup
program
  .version('1.0.0')
  .description('Ninja Command-Line Utility');

program
  .command('greet [name]')
  .description('Display a colorful greeting message')
  .action(greet);

program
  .command('fetch')
  .description('Fetch post data from a public API')
  .action(fetchPosts);

program
  .command('read <filepath>')
  .description('Read and display file content')
  .action(readFileContent);

program.parse(process.argv);