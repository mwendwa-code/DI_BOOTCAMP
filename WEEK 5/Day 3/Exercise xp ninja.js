"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Advanced Access Modifiers and Inheritance
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    calculateBonus() {
        return this.salary * 0.1;
    }
    getSalaryDetails() {
        return `${this.name} earns $${this.salary} and bonus is $${this.calculateBonus()}`;
    }
}
class Manager extends Employee {
    getSalaryDetails() {
        return `${this.name} earns $${this.salary} and bonus is $${this.calculateBonus()}`;
    }
}
class ExecutiveManager extends Manager {
    approveBudget(amount) {
        return `${this.name} approved a budget of $${amount}`;
    }
}
const executive = new ExecutiveManager("Alice", 38, 90000);
console.log(executive.getSalaryDetails());
console.log(executive.approveBudget(25000));
// console.log(executive.age); // Error: private, cannot access outside the class
// console.log(executive.salary); // Error: protected, cannot access outside the class
// Exercise 2: Advanced Static Methods and Properties
class Shape {
    static totalShapes = 0;
    constructor() {
        Shape.totalShapes++;
    }
    static getType() {
        return "Shape";
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
    static getType() {
        return "Circle";
    }
}
class Square extends Shape {
    side;
    constructor(side) {
        super();
        this.side = side;
    }
    area() {
        return this.side ** 2;
    }
    static getType() {
        return "Square";
    }
}
const circle = new Circle(5);
const square = new Square(4);
console.log(Shape.totalShapes);
console.log(Circle.getType());
console.log(Square.getType());
console.log(circle.area());
console.log(square.area());
class AdvancedCalculator {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    operate(operation) {
        return operation(this.a, this.b);
    }
}
const advancedCalculator = new AdvancedCalculator(10, 5);
console.log(advancedCalculator.operate((x, y) => x + y));
console.log(advancedCalculator.operate((x, y) => x - y));
console.log(advancedCalculator.operate((x, y) => x * y));
// Exercise 4: Readonly Properties in Complex Inheritance
class Device {
    serialNumber;
    constructor(serialNumber) {
        this.serialNumber = serialNumber;
    }
    getInfo() {
        return `Serial: ${this.serialNumber}`;
    }
}
class Laptop extends Device {
    model;
    price;
    constructor(serialNumber, model, price) {
        super(serialNumber);
        this.model = model;
        this.price = price;
    }
    getInfo() {
        return `Serial: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
    }
}
const laptop = new Laptop("SN-1001", "Dell XPS", 1500);
console.log(laptop.getInfo());
laptop.model = "MacBook Pro";
laptop.price = 1800;
console.log(laptop.getInfo());
class Smartphone {
    name;
    price;
    discount;
    warrantyPeriod;
    constructor(name, price, warrantyPeriod, discount) {
        this.name = name;
        this.price = price;
        this.warrantyPeriod = warrantyPeriod;
        if (discount !== undefined) {
            this.discount = discount;
        }
    }
    getFinalPrice() {
        const discountAmount = this.discount ?? 0;
        return this.price - discountAmount;
    }
}
const smartphone = new Smartphone("iPhone", 1000, 12, 100);
console.log(`${smartphone.name} final price: $${smartphone.getFinalPrice()}`);
const basicPhone = new Smartphone("Budget Phone", 300, 6);
console.log(`${basicPhone.name} final price: $${basicPhone.getFinalPrice()}`);
// smartphone.name = "Samsung"; // Error: readonly property cannot be reassigned
//# sourceMappingURL=Exercise%20xp%20ninja.js.map