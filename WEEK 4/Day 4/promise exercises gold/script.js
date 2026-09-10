// ==========================================
// EXERCISE 1: Promise.all()
// ==========================================

const promise1 = Promise.resolve(3);

const promise2 = 42;

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "foo");
});

Promise.all([promise1, promise2, promise3])
    .then(result => {
        console.log("Exercise 1:");
        console.log(result);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// ==========================================
// EXERCISE 2: Analyse Promise.all()
// ==========================================

function timesTwoAsync(x) {
    return new Promise(resolve => {
        resolve(x * 2);
    });
}

const arr = [1, 2, 3];

const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
    .then(result => {
        console.log("Exercise 2:");
        console.log(result);
    });