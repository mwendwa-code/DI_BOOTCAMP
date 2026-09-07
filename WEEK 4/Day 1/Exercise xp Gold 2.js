// Exercise 1: Sum elements
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum);

// Exercise 2: Remove duplicates
const values = [1, 2, 2, 3, 4, 4, 5];
const uniqueValues = [...new Set(values)];
console.log(uniqueValues);

// Exercise 3: Remove certain values
const sampleArray = [NaN, 0, 15, false, -22, "", undefined, 47, null];
const filteredArray = sampleArray.filter(Boolean);
console.log(filteredArray);

// Exercise 4: Repeat please!
function repeat(string, times = 1) {
	let result = "";

	for (let index = 0; index < times; index += 1) {
		result += string;
	}

	return result;
}

console.log(repeat("Ha!", 3));
console.log(repeat("Hello"));

// Exercise 5: Turtle & Rabbit
const startLine = "     ||<- Start line";
let turtle = "🐢";
let rabbit = "🐇";

turtle = turtle.padStart(9, " ");
rabbit = rabbit.padStart(9, " ");

console.log(startLine);
console.log(turtle);
console.log(rabbit);

const paddedTurtle = "🐢".trim().padEnd(9, "=");
console.log(paddedTurtle);
