const fs = require("fs");

const targetDirectory = ".";

fs.readdir(targetDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  console.log(`Files in "${targetDirectory}":`);
  files.forEach((file) => console.log(` - ${file}`));
});