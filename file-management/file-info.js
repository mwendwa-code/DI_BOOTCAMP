const fs = require('fs');
const path = require('path');

function displayFileInfo() {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  const exists = fs.existsSync(filePath);

  if (!exists) {
    console.log('File does not exist.');
    return;
  }

  const stats = fs.statSync(filePath);

  console.log('File exists:', exists);
  console.log('File size:', stats.size, 'bytes');
  console.log('Creation time:', stats.birthtime.toISOString());
}

module.exports = { displayFileInfo };
