// Exercise 1: Intersection Types

type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "Main Street",
  city: "Paris",
};

console.log(personWithAddress);

// Exercise 2: Type Guards with Union Types

function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  }
  return "This is a string";
}

console.log(describeValue(42));
console.log(describeValue("hello"));

// Exercise 3: Type Casting

const someValue: any = "Hello TypeScript";
const castedString: string = someValue as string;

console.log(castedString.toUpperCase());

// Exercise 4: Type Assertions with Union Types

function getFirstElement(items: Array<number | string>): string {
  const firstItem = items[0] as string;
  return firstItem;
}

const mixedNumbersAndStrings: Array<number | string> = ["first", 2, 3];
console.log(getFirstElement(mixedNumbersAndStrings));

// Exercise 5: Generic Constraints

function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}

logLength("Hello");
logLength([1, 2, 3, 4]);

// Exercise 6: Intersection Types and Type Guards

type Job = {
  position: string;
  department: string;
};

type Manager = Job & { position: "Manager" };
type Developer = Job & { position: "Developer" };
type Employee = Person & Job;

function isManager(job: Job): job is Manager {
  return job.position === "Manager";
}

function isDeveloper(job: Job): job is Developer {
  return job.position === "Developer";
}

function describeEmployee(employee: Employee): string {
  if (isManager(employee)) {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  }

  if (isDeveloper(employee)) {
    return `${employee.name} is a Developer in the ${employee.department} department.`;
  }

  return `${employee.name} has role ${employee.position} in the ${employee.department} department.`;
}

const manager: Employee = {
  name: "Sam",
  age: 35,
  position: "Manager",
  department: "HR",
};

const developer: Employee = {
  name: "Mia",
  age: 28,
  position: "Developer",
  department: "Engineering",
};

console.log(describeEmployee(manager));
console.log(describeEmployee(developer));

// Exercise 7: Type Assertions and Generic Constraints

function formatInput<T extends { toString(): string }>(input: T): string {
  const text = input as unknown as string;
  return `Formatted: ${text}`;
}

console.log(formatInput("Hello World"));
console.log(formatInput(12345));
