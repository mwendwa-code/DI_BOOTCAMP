function allTruthy(...values) {
    return values.every(value => Boolean(value));
}

// Test the function
console.log(allTruthy(true, true, true));
console.log(allTruthy(true, false, true));
console.log(allTruthy(5, 4, 3, 2, 1, 0));