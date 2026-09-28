const fs = require('fs');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return null;
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully written to ${filePath}`);
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err.message);
    return false;
  }
}

module.exports = {
  readFile,
  writeFile
};