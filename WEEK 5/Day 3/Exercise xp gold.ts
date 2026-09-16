// Exercise 1: Class Inheritance with Protected Access Modifiers
class Employee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getDetails(): string {
    return `${this.name} - $${this.salary}`;
  }
}

class Manager extends Employee {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  override getDetails(): string {
    return `${this.name} - $${this.salary} - ${this.department}`;
  }
}

const manager = new Manager("Alice", 70000, "Engineering");
console.log(manager.getDetails());

// Exercise 2: Using Readonly with Access Modifiers
class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarDetails(): string {
    return `${this.make} ${this.model} (${this.year})`;
  }
}

const car = new Car("Toyota", "Corolla", 2022);
console.log(car.getCarDetails());
// car.make = "Honda"; // Error: Cannot assign to 'make' because it is a read-only property
// car.model = "Camry"; // Error: Cannot assign to 'model' because it is a read-only property

// Exercise 3: Static Properties and Methods in Classes
class MathUtils {
  static PI: number = 3.14159;

  static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log(MathUtils.circumference(5));

// Exercise 4: Interface with Function Types
interface Operation {
  (a: number, b: number): number;
}

class Addition {
  execute: Operation = (a: number, b: number): number => a + b;
}

class Multiplication {
  execute: Operation = (a: number, b: number): number => a * b;
}

const addition = new Addition();
const multiplication = new Multiplication();

console.log(addition.execute(4, 6));
console.log(multiplication.execute(4, 6));

// Exercise 5: Extending Interfaces with Optional and Readonly Properties
interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class Rect implements Rectangle {
  readonly width: number;
  readonly height: number;
  color: string;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rectangle = new Rect("Blue", 5, 3);
console.log(rectangle.getArea());
console.log(rectangle.getPerimeter());
