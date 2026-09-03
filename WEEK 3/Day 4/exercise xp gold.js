// Exercise 1: Nested functions
//
// Prediction: landscape() returns "____/''''\\____".
// flat(4) adds four underscores. mountain(4) adds a slash, four apostrophes,
// and a backslash. The final flat(4) adds four more underscores.
const landscape = () => {
	let result = "";

	const flat = (length) => {
		for (let count = 0; count < length; count++) {
			result += "_";
		}
	};

	const mountain = (height) => {
		result += "/";
		for (let counter = 0; counter < height; counter++) {
			result += "'";
		}
		result += "\\";
	};

	flat(4);
	mountain(4);
	flat(4);

	return result;
};

console.log(landscape()); // ____/''''\____

// Exercise 2: Closure
const addTo = (x) => (y) => x + y;
const addToTen = addTo(10);

// addTo(10) returns a function that remembers x = 10, so the result is 10 + 3 = 13.
console.log(addToTen(3)); // 13

// Exercise 3: Currying
const curriedSum = (a) => (b) => a + b;

// The first call stores a = 30; the second supplies b = 1. The result is 31.
console.log(curriedSum(30)(1)); // 31

// Exercise 4: Currying
const addNumbers = (a) => (b) => a + b;
const add5 = addNumbers(5);

// add5 is the partially applied function with a = 5, so add5(12) returns 17.
console.log(add5(12)); // 17

// Exercise 5: Composing
const compose = (f, g) => (value) => f(g(value));
const add1 = (number) => number + 1;
const addFive = (number) => number + 5;

// Composition applies g first: add5(10) = 15, then add1(15) = 16.
console.log(compose(add1, addFive)(10)); // 16
