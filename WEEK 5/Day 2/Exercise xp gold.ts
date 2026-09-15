export {};

// Exercise 1: Union Types
function processValue(value: string | number): string {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  }

  return [...value].reverse().join("");
}

// Exercise 2: Array Type Annotations
function sumNumbersInArray(values: (number | string)[]): number {
  return values.reduce<number>(
    (sum, value) => sum + (typeof value === "number" ? value : 0),
    0
  );
}

// Exercise 3: Type Aliases
type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  const message = `My name is ${user.name} and I am ${user.age} years old.`;
  return user.address ? `${message} I live at ${user.address}.` : message;
}

// Exercise 4: Optional Parameters
function welcomeUser(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}