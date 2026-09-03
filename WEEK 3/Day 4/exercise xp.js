const showAlert = (message) => {
	if (typeof alert === "function") {
		alert(message);
	} else {
		console.log(message);
	}
};

// Exercise 1: Scope

// #1: a starts at 5, then the if block changes the local variable to 3.
function funcOne() {
	let a = 5;
	if (a > 1) {
		a = 3;
	}
	showAlert(`inside the funcOne function ${a}`); // 3
}

// funcOne(); // The alert displays 3.

// With const, changing a to 3 causes a TypeError because const variables cannot be reassigned.

// #2: funcThree first reads the global a (0). funcTwo changes that same variable to 5.
{
	let a = 0;

	function funcTwo() {
		a = 5;
	}

	function funcThree() {
		showAlert(`inside the funcThree function ${a}`);
	}

	// funcThree(); // The alert displays 0.
	// funcTwo();
	// funcThree(); // The alert displays 5.
}

// With const, funcTwo throws a TypeError because it tries to reassign a.

// #3: window.a creates a global property, so funcFive can read "hello".
function funcFour() {
	globalThis.a = "hello";
}

function funcFive() {
	showAlert(`inside the funcFive function ${globalThis.a}`); // hello
}

// funcFour();
// funcFive(); // The alert displays hello.

// #4: the function's local a shadows the outer a, so the alert displays "test".
{
	let a = 1;

	function funcSix() {
		let a = "test";
		showAlert(`inside the funcSix function ${a}`); // test
	}

	// funcSix();
}

// Replacing either let with const does not change the result because neither variable is reassigned.

// #5: the block-scoped a is 5 inside the if block; the outer a remains 2.
{
	let a = 2;
	if (true) {
		let a = 5;
		showAlert(`in the if block ${a}`); // 5
	}
	showAlert(`outside of the if block ${a}`); // 2
}

// Replacing either let with const does not change the result because neither variable is reassigned.

// Exercise 2: Ternary operator
const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints);

// Exercise 3: Is it a string?
const isString = (value) => typeof value === "string";
console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));

// Exercise 4: Find the sum
const sum = (firstNumber, secondNumber) => firstNumber + secondNumber;
console.log(sum(3, 7));

// Exercise 5: Kg and grams
function kilogramsToGrams(weightInKilograms) {
	return weightInKilograms * 1000;
}
console.log(kilogramsToGrams(2));

const kilogramsToGramsExpression = function (weightInKilograms) {
	return weightInKilograms * 1000;
};
console.log(kilogramsToGramsExpression(2));

// A declaration is hoisted and can be invoked before its definition; an expression is assigned at runtime.
const kilogramsToGramsArrow = (weightInKilograms) => weightInKilograms * 1000;
console.log(kilogramsToGramsArrow(2));

const writeToDom = (message) => {
	if (typeof document === "undefined") {
		console.log(message);
		return;
	}

	const output = document.createElement("p");
	output.textContent = message;
	document.body.appendChild(output);
};

// Exercise 6: Fortune teller
(function (numberOfChildren, partnerName, geographicLocation, jobTitle) {
	writeToDom(
		`You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnerName} with ${numberOfChildren} kids.`
	);
})(3, "Alex", "Paris", "web developer");

// Exercise 7: Welcome
(function (userName) {
	if (typeof document === "undefined") {
		console.log(`Welcome ${userName}`);
		return;
	}

	const navbar = document.querySelector("nav");
	if (!navbar) {
		return;
	}

	const userProfile = document.createElement("div");
	userProfile.className = "user-profile";

	const profilePicture = document.createElement("img");
	profilePicture.src = "https://i.pravatar.cc/64?u=john";
	profilePicture.alt = `${userName}'s profile picture`;

	const name = document.createElement("span");
	name.textContent = userName;

	userProfile.append(profilePicture, name);
	navbar.appendChild(userProfile);
})("John");

// Exercise 8: Juice bar, Part I
function makeJuicePartOne(size) {
	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		writeToDom(
			`The client wants a ${size} juice, containing ${firstIngredient}, ${secondIngredient}, and ${thirdIngredient}.`
		);
	}

	addIngredients("apple", "mint", "ginger");
}

makeJuicePartOne("medium");

// Exercise 8: Juice bar, Part II
function makeJuice(size) {
	const ingredients = [];

	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		ingredients.push(firstIngredient, secondIngredient, thirdIngredient);
	}

	function displayJuice() {
		writeToDom(
			`The client wants a ${size} juice, containing ${ingredients.join(", ")}.`
		);
	}

	addIngredients("orange", "banana", "strawberry");
	addIngredients("pineapple", "lime", "coconut");
	displayJuice();
}

makeJuice("large");
