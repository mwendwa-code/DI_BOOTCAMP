// Exercise 1: Dog age to human years
const data = [
	{ name: "skilli", age: 3, type: "dog" },
	{ name: "Addih", age: 5, type: "rabbit" },
	{ name: "vybz", age: 6, type: "dog" },
	{ name: "spice", age: 1, type: "cat" },
	{ name: "kartel", age: 3, type: "dog" },
	{ name: "Ndovu", age: 10, type: "dog" },
];

let dogAgeSum = 0;
for (const animal of data) {
	if (animal.type === "dog") {
		dogAgeSum += animal.age * 7;
	}
}
console.log(dogAgeSum);

const dogAgeSumWithReduce = data.reduce(
	(sum, animal) => animal.type === "dog" ? sum + animal.age * 7 : sum,
	0
);
console.log(dogAgeSumWithReduce);

// Exercise 2: Email
const userEmail3 = " cannotfillemailformcorrectly@gmail.com ";
const cleanEmail = userEmail3.trim();
console.log(cleanEmail);

// Exercise 3: Employees #3
const users = [
	{ firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
	{ firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
	{ firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
	{ firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
	{ firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
	{ firstName: "Wes", lastName: "Reid", role: "Instructor" },
	{ firstName: "Zach", lastName: "Klabunde", role: "Instructor" },
];

const usersByFullName = {};
for (const user of users) {
	usersByFullName[`${user.firstName} ${user.lastName}`] = user.role;
}
console.log(usersByFullName);

// Exercise 4: Array to Object
const letters = ["x", "y", "z", "z"];

const letterCountsWithLoop = {};
for (const letter of letters) {
	letterCountsWithLoop[letter] = (letterCountsWithLoop[letter] || 0) + 1;
}
console.log(letterCountsWithLoop);

const letterCountsWithReduce = letters.reduce((counts, letter) => {
	counts[letter] = (counts[letter] || 0) + 1;
	return counts;
}, {});
console.log(letterCountsWithReduce);
