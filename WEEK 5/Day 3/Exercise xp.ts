// Exercise 1: Class with Access Modifiers
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `${this.name} - ${this.position}`;
  }
}

const emp = new Employee("Alice", 50000, "Developer", "Engineering");
console.log(emp.getEmployeeInfo());
// emp.salary would be a compile error because salary is private

// Exercise 2: Readonly Properties in a Class
class Product {
  readonly id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getProductInfo(): string {
    return `${this.name} - $${this.price}`;
  }
}

const product = new Product(1, "Laptop", 999);
console.log(product.getProductInfo());
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

// Exercise 3: Class Inheritance
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  override makeSound(): string {
    return "bark";
  }
}

const dog = new Dog("Buddy");
console.log(dog.makeSound());

// Exercise 4: Static Properties and Methods
class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));

// Exercise 5: Interfaces with Optional and Readonly Properties
interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Membership: ${user.membershipLevel ?? "Standard"}`);
}

const premiumUser: PremiumUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  membershipLevel: "Gold",
};

printUserDetails(premiumUser);