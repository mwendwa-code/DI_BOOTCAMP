const { faker } = require('@faker-js/faker');

const users = [];

function addUser(name = faker.person.fullName(), street = faker.location.street(), country = faker.location.country()) {
  users.push({
    name,
    address: {
      street,
      country
    }
  });
}

addUser();
addUser('John Doe', 'Main Street', 'France');
console.log(users);
