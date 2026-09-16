"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Class Inheritance with Protected Access Modifiers
class Employee {
    name;
    salary;
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getDetails() {
        return `${this.name} - $${this.salary}`;
    }
}
class Manager extends Employee {
    department;
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }
    getDetails() {
        return `${this.name} - $${this.salary} - ${this.department}`;
    }
}
const manager = new Manager("Alice", 70000, "Engineering");
console.log(manager.getDetails());
// Exercise 2: Using Readonly with Access Modifiers
class Car {
    make;
    model;
    year;
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    getCarDetails() {
        return `${this.make} ${this.model} (${this.year})`;
    }
}
const car = new Car("Toyota", "Corolla", 2022);
console.log(car.getCarDetails());
// car.make = "Honda"; // Error: Cannot assign to 'make' because it is a read-only property
// car.model = "Camry"; // Error: Cannot assign to 'model' because it is a read-only property
// Exercise 3: Static Properties and Methods in Classes
class MathUtils {
    static PI = 3.14159;
    static circumference(radius) {
        return 2 * MathUtils.PI * radius;
    }
}
console.log(MathUtils.circumference(5));
class Addition {
    execute = (a, b) => a + b;
}
class Multiplication {
    execute = (a, b) => a * b;
}
const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.execute(4, 6));
console.log(multiplication.execute(4, 6));
class Rect {
    width;
    height;
    color;
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
const rectangle = new Rect("Blue", 5, 3);
console.log(rectangle.getArea());
console.log(rectangle.getPerimeter());
//# sourceMappingURL=Exercise%20xp%20gold.js.map