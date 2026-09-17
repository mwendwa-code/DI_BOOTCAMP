type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type DataItem = User | Product | Order;

function isUser(item: DataItem): item is User {
  return item.type === 'user';
}

function isProduct(item: DataItem): item is Product {
  return item.type === 'product';
}

function isOrder(item: DataItem): item is Order {
  return item.type === 'order';
}

function handleData(items: DataItem[]): string[] {
  return items.map((item) => {
    if (isUser(item)) {
      return `Hello ${item.name}! You are ${item.age} years old.`;
    }

    if (isProduct(item)) {
      return `Product ${item.id} costs $${item.price}.`;
    }

    if (isOrder(item)) {
      return `Order ${item.orderId} has an amount of $${item.amount}.`;
    }

    return 'Unknown data type received.';
  });
}

const data: DataItem[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 25.99 },
  { type: 'order', orderId: 'ORD-123', amount: 150.5 },
];

console.log(handleData(data));
