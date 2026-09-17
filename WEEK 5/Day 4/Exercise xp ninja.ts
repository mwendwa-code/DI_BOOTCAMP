// Exercise 1: TypeScript Generics and Intersection Types

type Identifiable = {
  id: number;
};

type Timestamped = {
  createdAt: string;
};

type ItemWithMeta<T> = T & Identifiable & Timestamped;

class Container<T extends object> {
  private items: Array<T & Identifiable & Timestamped> = [];

  add(item: T & Identifiable & Timestamped): void {
    this.items.push(item);
  }

  remove(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  list(): Array<T & Identifiable & Timestamped> {
    return this.items;
  }
}

const productContainer = new Container<{ name: string; price: number }>();

productContainer.add({
  id: 1,
  createdAt: "2026-09-17",
  name: "Laptop",
  price: 1200,
});

productContainer.add({
  id: 2,
  createdAt: "2026-09-18",
  name: "Mouse",
  price: 50,
});

console.log(productContainer.list());
productContainer.remove(1);
console.log(productContainer.list());

// Exercise 2: Generic Interfaces and Type Casting

interface Response<T> {
  success: boolean;
  data: T;
  error?: string;
}

function parseResponse<T>(response: Response<unknown>): T {
  return response.data as T;
}

const apiResponse: Response<unknown> = {
  success: true,
  data: {
    id: 7,
    name: "Alice",
  },
};

const user = parseResponse<{ id: number; name: string }>(apiResponse);
console.log(user);

// Exercise 3: Generic Classes and Type Assertions

class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    const item = this.items[index];
    return item as T;
  }

  list(): T[] {
    return this.items;
  }
}

const stringRepository = new Repository<string>();
stringRepository.add("one");
stringRepository.add("two");
console.log(stringRepository.get(0));
console.log(stringRepository.list());

const numberRepository = new Repository<number>();
numberRepository.add(10);
numberRepository.add(20);
console.log(numberRepository.get(1));
