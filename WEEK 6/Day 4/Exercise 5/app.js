const _ = require("lodash");
const { add, multiply } = require("./math.js");

const numbers = [4, 8, 15, 16, 23, 42];

const total = _.sum(numbers);
console.log(`Sum of numbers (lodash): ${total}`);

const added = add(total, 10);
console.log(`add(${total}, 10) = ${added}`);

const multiplied = multiply(added, 2);
console.log(`multiply(${added}, 2) = ${multiplied}`);

console.log(`Max value (lodash): ${_.max(numbers)}`);
console.log(`Chunked into pairs (lodash): ${JSON.stringify(_.chunk(numbers, 2))}`);