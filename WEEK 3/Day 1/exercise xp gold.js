// Exercise 1: Divisible by three
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] % 3 === 0);
}

// Exercise 2: Attendance
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina",
};

let studentName = prompt("Please enter your name:");

if (studentName in guestList) {
  console.log(`Hi! I'm ${studentName}, and I'm from ${guestList[studentName]}.`);
} else {
  console.log("Hi! I'm a guest.");
}

// Exercise 3: Playing with numbers
let age = [20, 5, 12, 43, 98, 55];

let total = 0;
for (let i = 0; i < age.length; i++) {
  total += age[i];
}
console.log("Sum of ages:", total);

let highestAge = age[0];
for (let i = 1; i < age.length; i++) {
  if (age[i] > highestAge) {
    highestAge = age[i];
  }
}
console.log("Highest age:", highestAge);

// Exercise 1: Checking the BMI
const person1 = {
  fullName: "John Doe",
  mass: 80,
  height: 1.8,
  bmi: function () {
    return this.mass / (this.height * this.height);
  },
};

const person2 = {
  fullName: "Jane Smith",
  mass: 65,
  height: 1.7,
  bmi: function () {
    return this.mass / (this.height * this.height);
  },
};

function compareBMI(personA, personB) {
  const bmiA = personA.bmi();
  const bmiB = personB.bmi();

  if (bmiA > bmiB) {
    console.log(`${personA.fullName} has the largest BMI.`);
  } else if (bmiB > bmiA) {
    console.log(`${personB.fullName} has the largest BMI.`);
  } else {
    console.log("Both people have the same BMI.");
  }
}

compareBMI(person1, person2);

// Exercise 2: Grade Average
function calculateAverage(gradesList) {
  let total = 0;
  for (let i = 0; i < gradesList.length; i++) {
    total += gradesList[i];
  }
  return total / gradesList.length;
}

function checkResult(gradesList) {
  const average = calculateAverage(gradesList);
  console.log("Average:", average);

  if (average > 65) {
    console.log("Passed");
  } else {
    console.log("Failed. You must repeat the course.");
  }
}

checkResult([80, 70, 90, 60, 75]);
