"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Class with Access Modifiers
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `${this.name} - ${this.position}`;
    }
}
const emp = new Employee("Alice", 50000, "Developer", "Engineering");
console.log(emp.getEmployeeInfo());
// emp.salary would be a compile error because salary is private
// Exercise 2: Readonly Properties in a Class
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `${this.name} - $${this.price}`;
    }
}
const product = new Product(1, "Laptop", 999);
console.log(product.getProductInfo());
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
// Exercise 3: Class Inheritance
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return `${this.name} makes a sound`;
    }
}
class Dog extends Animal {
    makeSound() {
        return "bark";
    }
}
const dog = new Dog("Buddy");
console.log(dog.makeSound());
// Exercise 4: Static Properties and Methods
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));
function printUserDetails(user) {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Membership: ${user.membershipLevel ?? "Standard"}`);
}
const premiumUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    membershipLevel: "Gold",
};
printUserDetails(premiumUser);
//# sourceMappingURL=Exercise%20xp.js.map