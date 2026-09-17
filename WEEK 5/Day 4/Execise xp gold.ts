// Exercise 1: Combining Intersection Types with Type Guards

interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

type AdminUser = User & Admin;

function hasProperty<K extends string>(
  obj: AdminUser,
  key: K
): obj is AdminUser & Record<K, unknown> {
  return key in obj;
}

function getProperty(obj: AdminUser, propertyName: string): unknown {
  if (hasProperty(obj, propertyName)) {
    return obj[propertyName as keyof AdminUser];
  }
  return undefined;
}

const adminUser: AdminUser = {
  name: "Alice",
  email: "alice@example.com",
  adminLevel: 5,
};

console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "adminLevel"));
console.log(getProperty(adminUser, "phone"));

// Exercise 2: Type Casting with Generics

function castToType<T>(value: unknown, converter: (input: unknown) => T): T {
  return converter(value) as T;
}

const numberFromString = castToType<number>("42", Number);
const booleanFromString = castToType<boolean>("true", Boolean);

console.log(numberFromString, typeof numberFromString);
console.log(booleanFromString, typeof booleanFromString);

// Exercise 3: Type Assertions with Generic Constraints

function getArrayLength<T extends number | string>(items: T[]): number {
  return items.length;
}

console.log(getArrayLength([1, 2, 3, 4]));
console.log(getArrayLength(["a", "b", "c"]));

// Exercise 4: Generic Interfaces with Class Implementation

interface Storage<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class Box<T> implements Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

const stringBox = new Box<string>();
stringBox.add("apple");
stringBox.add("banana");
console.log(stringBox.get(0));

const numberBox = new Box<number>();
numberBox.add(10);
numberBox.add(20);
console.log(numberBox.get(1));

// Exercise 5: Combining Generic Classes with Constraints

interface Item<T> {
  value: T;
}

class Queue<T> {
  private items: Item<T>[] = [];

  add(item: Item<T>): void {
    this.items.push(item);
  }

  remove(): Item<T> | undefined {
    return this.items.shift();
  }
}

const stringQueue = new Queue<string>();
stringQueue.add({ value: "first" });
stringQueue.add({ value: "second" });
console.log(stringQueue.remove());

const numberQueue = new Queue<number>();
numberQueue.add({ value: 1 });
numberQueue.add({ value: 2 });
console.log(numberQueue.remove());
