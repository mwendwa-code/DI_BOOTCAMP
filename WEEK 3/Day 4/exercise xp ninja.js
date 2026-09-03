// Exercise 1: Merge Words

// Each call stores the current sentence in a closure. Calling the returned
// function without an argument ends the chain and returns that sentence.
const mergeWords = (string) => (nextString) =>
	nextString === undefined
		? string
		: mergeWords(`${string} ${nextString}`);

console.log(mergeWords("Hello")()); // Hello
console.log(mergeWords("There")("is")("no")("spoon.")());
// There is no spoon.
