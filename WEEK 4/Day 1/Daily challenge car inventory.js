const inventory = [
	{ id: 1, car_make: "Lambo", car_model: "Aventador", car_year: 2009 },
	{ id: 2, car_make: "BMW", car_model: "320i", car_year: 2001 },
	{ id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
	{ id: 4, car_make: "Bugatti", car_model: "Veyron", car_year: 2010 },
	{ id: 5, car_make: "AUDI", car_model: "A4", car_year: 1995 },
];

function getCarLambo(carInventory) {
	const lambo = carInventory.find((car) => car.car_make === "Lambo");

	return `This is a ${lambo.car_make} ${lambo.car_model} from ${lambo.car_year}`;
}

function sortCarInventoryByYear(carInventory) {
	return [...carInventory].sort((firstCar, secondCar) =>
		firstCar.car_year - secondCar.car_year
	);
}

console.log(getCarLambo(inventory));
console.log(sortCarInventoryByYear(inventory));
