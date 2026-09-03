let client = "John";

const groceries = {
	fruits: ["pear", "apple", "banana"],
	vegetables: ["tomatoes", "cucumber", "salad"],
	totalPrice: "20$",
	other: {
		paid: true,
		meansOfPayment: ["cash", "creditCard"]
	}
};

const displayGroceries = () => {
	groceries.fruits.forEach((fruit) => console.log(fruit));
};

const cloneGroceries = () => {
	const user = client;
	client = "Betty";

	console.log("user:", user); // John
	console.log("client:", client); // Betty
	console.log(
		"The user is still John because strings are primitive values copied by value."
	);

	const shopping = groceries;
	groceries.totalPrice = "35$";
	groceries.other.paid = false;

	console.log("shopping total price:", shopping.totalPrice); // 35$
	console.log("shopping paid:", shopping.other.paid); // false
	console.log(
		"The shopping changes are visible because shopping and groceries reference the same object."
	);
};

displayGroceries();
cloneGroceries();
