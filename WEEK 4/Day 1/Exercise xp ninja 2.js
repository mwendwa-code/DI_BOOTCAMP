// Exercise 1: Menu
const menu = [
	{
		type: "starter",
		name: "Houmous with Pita",
	},
	{
		type: "starter",
		name: "Vegetable Soup with Houmous peas",
	},
	{
		type: "dessert",
		name: "Chocolate Cake",
	},
];

const hasDessert = menu.some((course) => course.type === "dessert");
console.log(hasDessert ? "The menu has a dessert." : "The menu has no dessert.");

const allStarters = menu.every((course) => course.type === "starter");
console.log(allStarters);

if (!menu.some((course) => course.type === "main course")) {
	menu.push({ type: "main course", name: "Vegetable Pasta" });
}
console.log(menu);

const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
menu.forEach((course) => {
	course.vegetarian = vegetarian.some((ingredient) =>
		course.name.toLowerCase().includes(ingredient)
	);
});
console.log(menu);

// Exercise 2: Chop into chunks
function stringChop(text, chunkLength) {
	const chunks = [];

	for (let start = 0; start < text.length; start += chunkLength) {
		chunks.push(text.slice(start, start + chunkLength));
	}

	return chunks;
}

console.log(stringChop("developers", 2));

// Exercise 3: You said string?
function searchWord(text, word) {
	const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const matches = text.match(new RegExp(`\\b${escapedWord}\\b`, "gi"));
	const count = matches ? matches.length : 0;

	return `"${word}" was found ${count} times.`;
}

console.log(searchWord("The quick brown fox", "fox"));

// Exercise 4: Reverse Array
function reverseArray(array) {
	for (let left = 0, right = array.length - 1; left < right; left++, right--) {
		[array[left], array[right]] = [array[right], array[left]];
	}

	return array;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArray([1, 2]));
console.log(reverseArray([]));
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
