const path = require("path");
const fs = require("fs");

function showFileInfo() {
  // Build the path to data/example.txt relative to this file's directory
  const filePath = path.join(__dirname, "data", "example.txt");

  // Check if the file exists
  const exists = fs.existsSync(filePath);
  console.log(`File path: ${filePath}`);
  console.log(`File exists: ${exists}`);

  if (!exists) {
    return;
  }

  // Get file stats (size, creation time, etc.)
  const stats = fs.statSync(filePath);

  console.log(`File size: ${stats.size} bytes`);
  console.log(`Created at: ${stats.birthtime}`);
  console.log(`Last modified at: ${stats.mtime}`);
}

module.exports = { showFileInfo };