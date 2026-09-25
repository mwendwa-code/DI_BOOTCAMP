const { readFile, writeFile } = require('./fileManager');

const helloContent = readFile('./Hello World.txt');
console.log('Read content:', helloContent.trim());

writeFile('./Bye World.txt', 'Writing to the file');
console.log('Updated Bye World.txt');
