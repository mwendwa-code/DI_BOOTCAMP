"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1
console.log("Hello, World!");
// Exercise 2
const age = 25;
const name = "Alice";
console.log(age);
console.log(name);
// Exercise 3
let id = 101;
console.log(id);
id = "ABC123";
console.log(id);
// Exercise 4
function checkNumber(number) {
    if (number > 0) {
        return "Positive";
    }
    else if (number < 0) {
        return "Negative";
    }
    else {
        return "Zero";
    }
}
console.log(checkNumber(10));
// Exercise 5
function getDetails(name, age) {
    return [name, age, `Hello, ${name}! You are ${age} years old.`];
}
const details = getDetails("Alice", 25);
console.log(details);
function createPerson(name, age) {
    return { name, age };
}
console.log(createPerson("John", 30));
// Exercise 7
const usernameInput = document.getElementById("username");
if (usernameInput) {
    usernameInput.value = "Alice";
}
// Exercise 8
function getAction(role) {
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
function greet(name) {
    return name ? `Hello, ${name}!` : "Hello, World!";
}
console.log(greet("Alice"));
console.log(greet());
//# sourceMappingURL=Exercise%20xp.js.map