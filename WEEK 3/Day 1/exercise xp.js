// ---------------------------
// Exercise 1: List of people
// ---------------------------
const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift();

// 2. Replace "James" with "Jason"
const jamesIndex = people.indexOf("James");
if (jamesIndex !== -1) {
  people[jamesIndex] = "Jason";
}

// 3. Add your name to the end of the array
people.push("YourName");

// 4. Console.log Mary's index
console.log("Mary index:", people.indexOf("Mary"));

// 5. Copy the array without "Mary" and without your name
const peopleCopy = people.slice(1, 3);
console.log("People copy:", peopleCopy);

// 6. Index of "Foo"
console.log("Foo index:", people.indexOf("Foo"));
// It returns -1 because "Foo" is not present in the array.

// 7. Last element of the array
const last = people[people.length - 1];
console.log("Last person:", last);

// Part II - Loops
console.log("Loop through people:");
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

console.log("Stop after Devon:");
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// ---------------------------
// Exercise 2: Your favorite colors
// ---------------------------
const colors = ["blue", "red", "green", "yellow", "purple"];

console.log("My favorite colors:");
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
console.log("Bonus:");
for (let i = 0; i < colors.length; i++) {
  const number = i + 1;
  const suffix = suffixes[number % 10] || "th";
  console.log(`My ${number}${suffix} choice is ${colors[i]}`);
}

// ---------------------------
// Exercise 3: Repeat the question
// ---------------------------
const askForNumber = () => {
  if (typeof prompt === "function") {
    return Number(prompt("Please enter a number greater than or equal to 10:"));
  }
  return 12;
};

let userNumber = askForNumber();
while (Number.isNaN(userNumber) || userNumber < 10) {
  userNumber = askForNumber();
}
console.log("Final number:", userNumber);

// ---------------------------
// Exercise 4: Building Management
// ---------------------------
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

console.log("Number of floors:", building.numberOfFloors);
console.log(
  "Apartments on floors 1 and 3:",
  building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor
);
console.log(
  "Second tenant:",
  building.nameOfTenants[1],
  "Rooms:",
  building.numberOfRoomsAndRent.dan[0]
);

if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log("Updated Dan rent:", building.numberOfRoomsAndRent.dan[1]);

// ---------------------------
// Exercise 5: Family
// ---------------------------
const family = {
  mother: "Alice",
  father: "Bob",
  brother: "Charlie",
  sister: "Dana",
};

console.log("Family keys:");
for (const key in family) {
  console.log(key);
}

console.log("Family values:");
for (const key in family) {
  console.log(family[key]);
}

// ---------------------------
// Exercise 6: Rudolf
// ---------------------------
const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

const keys = Object.keys(details);
let sentence = "";
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  sentence += (i === 0 ? "" : " ") + key + " " + details[key];
}
console.log(sentence);

// ---------------------------
// Exercise 7: Secret Group
// ---------------------------
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const sortedNames = [...names].sort();
const secretSociety = sortedNames.map((name) => name[0]).join("");
console.log("Secret society:", secretSociety);
