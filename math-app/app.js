const _ = require('lodash');
const math = require('./math');

const sum = math.add(10, 5);
const product = math.multiply(sum, _.add(2, 3));
const finalResult = _.multiply(product, 2);

console.log('Sum:', sum);
console.log('Product using lodash:', product);
console.log('Final result:', finalResult);
