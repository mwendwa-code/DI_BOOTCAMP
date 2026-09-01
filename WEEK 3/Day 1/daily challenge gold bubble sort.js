const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// 1. Convert array to a string using .toString()
console.log("toString():", numbers.toString());

// 2. Convert array to a string using .join() with different separators
console.log("join('+'):", numbers.join("+"));
console.log("join(' '):", numbers.join(" "));
console.log("join(''):", numbers.join(""));

// Bonus: Bubble sort in descending order using nested for loops
let sortedNumbers = [...numbers];

for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      let temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;
    }

    console.log(`Pass ${i + 1}, comparison ${j + 1}:`, [...sortedNumbers]);
  }
}

console.log("Final sorted numbers:", sortedNumbers);
