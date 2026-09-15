"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Union Types
function processValue(value) {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }
    return [...value].reverse().join("");
}
// Exercise 2: Array Type Annotations
function sumNumbersInArray(values) {
    return values.reduce((sum, value) => sum + (typeof value === "number" ? value : 0), 0);
}
function introduceAdvancedUser(user) {
    const message = `My name is ${user.name} and I am ${user.age} years old.`;
    return user.address ? `${message} I live at ${user.address}.` : message;
}
// Exercise 4: Optional Parameters
function welcomeUser(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}
//# sourceMappingURL=Exercise%20xp%20gold.js.map