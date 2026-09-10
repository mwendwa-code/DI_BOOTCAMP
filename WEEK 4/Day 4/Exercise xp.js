Exercise:1
function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve("The number is less than or equal to 10");
        } else {
            reject("The number is greater than 10");
        }
    });
}

// Test with 15 - should reject
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Test with 8 - should resolve
compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));

    Exercise:2
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});

promise.then(result => {
    console.log(result);
});

Exercise:3
// Promise that resolves with 3
const resolvedPromise = Promise.resolve(3);

resolvedPromise.then(result => {
    console.log(result);
});

// Promise that rejects with "Boo!"
const rejectedPromise = Promise.reject("Boo!");

rejectedPromise.catch(error => {
    console.log(error);
});