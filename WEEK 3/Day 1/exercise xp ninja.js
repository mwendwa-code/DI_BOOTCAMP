// Exercise 1 : Checking the BMI
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

// Exercise 2 : Grade Average
function findAvg(gradesList) {
  let total = 0;
  for (let i = 0; i < gradesList.length; i++) {
    total += gradesList[i];
  }

  const average = total / gradesList.length;
  console.log("Average:", average);

  if (average > 65) {
    console.log("Passed");
  } else {
    console.log("Failed. You must repeat the course.");
  }
}

// Bonus: split into two functions
function calculateAverage(gradesList) {
  let total = 0;
  for (let i = 0; i < gradesList.length; i++) {
    total += gradesList[i];
  }
  return total / gradesList.length;
}

function checkAverage(gradesList) {
  const average = calculateAverage(gradesList);
  console.log("Average:", average);

  if (average > 65) {
    console.log("Passed");
  } else {
    console.log("Failed. You must repeat the course.");
  }
}

findAvg([80, 70, 90, 60, 75]);
checkAverage([50, 55, 62, 64]);