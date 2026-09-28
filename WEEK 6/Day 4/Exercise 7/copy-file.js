const fs = require("fs");

const sourceFile = "./source.txt";
const destinationFile = "./destination.txt";

const content = fs.readFileSync(sourceFile, "utf-8");
fs.writeFileSync(destinationFile, content, "utf-8");

console.log(`Copied content from "${sourceFile}" to "${destinationFile}"`);