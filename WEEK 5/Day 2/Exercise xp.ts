// Exercise 1
console.log("Hello, World!");

// Exercise 2
const age: number = 25;
const name: string = "Alice";

console.log(age);
console.log(name);

// Exercise 3
let id: string | number = 101;
console.log(id);

id = "ABC123";
console.log(id);

// Exercise 4
function checkNumber(number: number): string {
  if (number > 0) {
    return "Positive";
  } else if (number < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log(checkNumber(10));

// Exercise 5
function getDetails(
  name: string,
  age: number
): [string, number, string] {
  return [name, age, `Hello, ${name}! You are ${age} years old.`];
}

const details = getDetails("Alice", 25);
console.log(details);

// Exercise 6
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

console.log(createPerson("John", 30));

// Exercise 7
const usernameInput = document.getElementById(
  "username"
) as HTMLInputElement | null;

if (usernameInput) {
  usernameInput.value = "Alice";
}

// Exercise 8
function getAction(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));

// Exercise 9
function greet(): string;
function greet(name: string): string;
function greet(name?: string): string {
  return name ? `Hello, ${name}!` : "Hello, World!";
}

console.log(greet("Alice"));
console.log(greet());