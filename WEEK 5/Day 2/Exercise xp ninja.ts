export {};

// Exercise 1: Conditional Types
type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType<T extends number | string>(value: T): MappedType<T> {
  if (typeof value === "number") {
    return (value * value) as MappedType<T>;
  }

  return value.length as MappedType<T>;
}

console.log(mapType(5)); // 25
console.log(mapType("Hello")); // 5

// Exercise 2: keyof and Lookup Types
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  name: "Alice",
  age: 25,
  isAdmin: false,
};

console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
console.log(getProperty(user, "isAdmin"));

// Exercise 3: Numeric Properties
interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty<T extends HasNumericProperty>(
  object: T,
  key: keyof T,
  factor: number
): number {
  return (object[key] as number) * factor;
}

const product = {
  price: 20,
  quantity: 3,
};

console.log(multiplyProperty(product, "price", 2)); // 40
console.log(multiplyProperty(product, "quantity", 5)); // 15