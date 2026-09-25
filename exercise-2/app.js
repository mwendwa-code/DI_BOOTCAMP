import { people } from './data.js';

function averageAge(persons) {
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

console.log('Average age:', averageAge(people).toFixed(2));
