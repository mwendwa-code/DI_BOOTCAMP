// Exercise 1: Advanced Access Modifiers and Inheritance
class Employee {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.1;
  }

  public getSalaryDetails(): string {
    return `${this.name} earns $${this.salary} and bonus is $${this.calculateBonus()}`;
  }
}

class Manager extends Employee {
  override getSalaryDetails(): string {
    return `${this.name} earns $${this.salary} and bonus is $${this.calculateBonus()}`;
  }
}

class ExecutiveManager extends Manager {
  approveBudget(amount: number): string {
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
  static totalShapes: number = 0;

  constructor() {
    Shape.totalShapes++;
  }

  static getType(): string {
    return "Shape";
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  static override getType(): string {
    return "Circle";
  }
}

class Square extends Shape {
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  area(): number {
    return this.side ** 2;
  }

  static override getType(): string {
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

// Exercise 3: Complex Interfaces with Function Types
interface Calculator {
  a: number;
  b: number;
  operate(operation: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  operate(operation: (x: number, y: number) => number): number {
    return operation(this.a, this.b);
  }
}

const advancedCalculator = new AdvancedCalculator(10, 5);
console.log(advancedCalculator.operate((x, y) => x + y));
console.log(advancedCalculator.operate((x, y) => x - y));
console.log(advancedCalculator.operate((x, y) => x * y));

// Exercise 4: Readonly Properties in Complex Inheritance
class Device {
  readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  getInfo(): string {
    return `Serial: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  model: string;
  price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  override getInfo(): string {
    return `Serial: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
  }
}

const laptop = new Laptop("SN-1001", "Dell XPS", 1500);
console.log(laptop.getInfo());
laptop.model = "MacBook Pro";
laptop.price = 1800;
console.log(laptop.getInfo());
// laptop.serialNumber = "NEW-001"; // Error: readonly property cannot be reassigned

// Exercise 5: Extending Multiple Interfaces with Optional and Readonly Properties
interface Product {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends Product {
  warrantyPeriod: number;
}

class Smartphone implements Electronics {
  readonly name: string;
  price: number;
  discount?: number;
  warrantyPeriod: number;

  constructor(name: string, price: number, warrantyPeriod: number, discount?: number) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;

    if (discount !== undefined) {
      this.discount = discount;
    }
  }

  getFinalPrice(): number {
    const discountAmount = this.discount ?? 0;
    return this.price - discountAmount;
  }
}

const smartphone = new Smartphone("iPhone", 1000, 12, 100);
console.log(`${smartphone.name} final price: $${smartphone.getFinalPrice()}`);

const basicPhone = new Smartphone("Budget Phone", 300, 6);
console.log(`${basicPhone.name} final price: $${basicPhone.getFinalPrice()}`);
// smartphone.name = "Samsung"; // Error: readonly property cannot be reassigned
