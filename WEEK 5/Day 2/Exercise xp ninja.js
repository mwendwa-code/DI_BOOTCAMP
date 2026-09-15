"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapType(value) {
    if (typeof value === "number") {
        return (value * value);
    }
    return value.length;
}
console.log(mapType(5)); // 25
console.log(mapType("Hello")); // 5
// Exercise 2: keyof and Lookup Types
function getProperty(object, key) {
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
function multiplyProperty(object, key, factor) {
    return object[key] * factor;
}
const product = {
    price: 20,
    quantity: 3,
};
console.log(multiplyProperty(product, "price", 2)); // 40
console.log(multiplyProperty(product, "quantity", 5)); // 15
//# sourceMappingURL=Exercise%20xp%20ninja.js.map