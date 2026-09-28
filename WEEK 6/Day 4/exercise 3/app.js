const { readFile, writeFile } = require('./filemanager');

const helloFile = './Hello World.txt';
const byeFile = './Bye World.txt';

const content = readFile(helloFile);
console.log('Content read:', content);

writeFile(byeFile, 'Writing to the file');