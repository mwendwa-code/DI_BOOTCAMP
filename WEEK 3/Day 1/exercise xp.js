// =========================================
// Exercise 1: List of people
// =========================================

const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays

// 1. Remove "Greg"
people.shift();
console.log("After removing Greg:", people);

// 2. Replace "James" with "Jason"
const jamesIndex = people.indexOf("James");
if (jamesIndex !== -1) {
  people[jamesIndex] = "Jason";
}
console.log("After replacing James:", people);

// 3. Add your name to the end of the array
people.push("YourName");
console.log("After adding name:", people);

// 4. Console.log Mary's index
console.log("Mary's index:", people.indexOf("Mary"));

// 5. Copy the array without "Mary" and without your name
const peopleCopy = people.slice(1, 3);
console.log("Copy without Mary and YourName:", peopleCopy);

// 6. Index of "Foo"
console.log("Foo's index:", people.indexOf("Foo"));
// Returns -1 because "Foo" is not in the array

// 7. Last element of the array
const last = people[people.length - 1];
console.log("Last person:", last);

// Part II - Loops

// 1. Iterate through array and console.log each person
console.log("All people:");
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

// 2. Iterate and exit after "Devon"
console.log("Stop after Devon:");
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// =========================================
// Exercise 2: Your favorite colors
// =========================================

const colors = ["blue", "red", "green", "yellow", "purple"];

// 1-2. Loop and console.log with position
console.log("\nMy favorite colors:");
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// 3. Bonus: With proper suffix (1st, 2nd, 3rd, 4th, 5th)
const suffixes = ["st", "nd", "rd", "th", "th"];
console.log("\nWith proper suffixes:");
for (let i = 0; i < colors.length; i++) {
  const number = i + 1;
  const suffix = i < suffixes.length ? suffixes[i] : "th";
  console.log(`My ${number}${suffix} choice is ${colors[i]}`);
}

// =========================================
// Exercise 3: Repeat the question
// =========================================

function askForNumber() {
  let userNumber;
  while (true) {
    userNumber = Number(prompt("Please enter a number greater than or equal to 10:"));
    if (!isNaN(userNumber) && userNumber >= 10) {
      break;
    }
    alert("Invalid input. Please enter a number >= 10");
  }
  return userNumber;
}

// Uncomment to test:
// const userNum = askForNumber();
// console.log("You entered:", userNum);

// =========================================
// Exercise 4: Building Management
// =========================================

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

// 1. Already copied above

// 2. Number of floors
console.log("\nNumber of floors:", building.numberOfFloors);

// 3. Apartments on floors 1 and 3
const floorsOneAndThree =
  building.numberOfAptByFloor.firstFloor +
  building.numberOfAptByFloor.thirdFloor;
console.log("Apartments on floors 1 and 3:", floorsOneAndThree);

// 4. Second tenant and number of rooms
console.log("Second tenant:", building.nameOfTenants[1]);
console.log("Dan's rooms:", building.numberOfRoomsAndRent.dan[0]);

// 5. Check if Sarah + David rent > Dan's rent, if yes increase Dan's to 1200
const sarahAndDavidRent =
  building.numberOfRoomsAndRent.sarah[1] +
  building.numberOfRoomsAndRent.david[1];
if (sarahAndDavidRent > building.numberOfRoomsAndRent.dan[1]) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log("Dan's new rent:", building.numberOfRoomsAndRent.dan[1]);

// =========================================
// Exercise 5: Family
// =========================================

const family = {
  mother: "Alice",
  father: "Bob",
  brother: "Charlie",
  sister: "Dana",
};

// 1-2. Console.log keys using for...in
console.log("\nFamily keys:");
for (const key in family) {
  console.log(key);
}

// 3. Console.log values using for...in
console.log("\nFamily values:");
for (const key in family) {
  console.log(family[key]);
}

// =========================================
// Exercise 6: Rudolf
// =========================================

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

// Build the sentence using a for loop
let sentence = "";
const keys = Object.keys(details);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = details[key];
  sentence += key + " " + value;
  if (i < keys.length - 1) {
    sentence += " ";
  }
}
console.log("\nRudolf sentence:", sentence);

// =========================================
// Exercise 7: Secret Group
// =========================================

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// Get first letter of each name, sort alphabetically, and join
const firstLetters = names.map((name) => name[0]);
const sortedLetters = firstLetters.sort();
const secretSociety = sortedLetters.join("");

console.log("\nSecret society name:", secretSociety);
