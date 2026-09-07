// Exercise 1: Analyzing the map method
// Output: [2, 4, 6]
const doubledNumbers = [1, 2, 3].map((num) => {
	if (typeof num === "number") return num * 2;
	return;
});
console.log(doubledNumbers);

// Exercise 2: Analyzing the reduce method
// Output: [1, 2, 0, 1, 2, 3]
const reducedNumbers = [[0, 1], [2, 3]].reduce(
	(acc, cur) => acc.concat(cur),
	[1, 2]
);
console.log(reducedNumbers);

// Exercise 3: Analyze this code
const arrayNum = [1, 2, 4, 5, 8, 9];

// i is the current zero-based index: 0, 1, 2, 3, 4, then 5.
const newArray = arrayNum.map((num, i) => {
	console.log(num, i);
	return num * 2;
});
console.log(newArray);

// Exercise 4: Nested arrays
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const simplifiedArray = array
	.flat(1)
	.map((item) => (Array.isArray(item) ? item.flat(1) : item));
console.log(simplifiedArray);

const greeting = [
	["Hello", "young", "grasshopper!"],
	["you", "are"],
	["learning", "fast!"],
];
const joinedGreetings = greeting.map((words) => words.join(" "));
console.log(joinedGreetings);

const greetingSentence = joinedGreetings.join(" ");
console.log(greetingSentence);

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const releasedNumber = trapped.flat(Infinity);
console.log(releasedNumber);
