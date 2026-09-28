const chalk = require("chalk");

console.log(chalk.green("Success! Your script is running correctly."));
console.log(chalk.blue.bold("This text is bold and blue."));
console.log(chalk.bgYellow.black(" Warning: this has a yellow background "));
console.log(chalk.red.underline("This is red and underlined."));
console.log(
  chalk.magenta("Multiple") +
    " " +
    chalk.cyan("colors") +
    " " +
    chalk.yellow("in one line!")
);