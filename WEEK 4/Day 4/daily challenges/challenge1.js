// ==========================================
// DAILY CHALLENGE 1
// ==========================================

// Function 1: Make all words uppercase
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {

    // Check that every item is a string
    if (words.every(word => typeof word === "string")) {

      const uppercasedWords = words.map(word => word.toUpperCase());

      resolve(uppercasedWords);

    } else {
      reject("Error: All items in the array must be strings.");
    }
  });
}


// Function 2: Sort the words alphabetically
function sortWords(words) {
  return new Promise((resolve, reject) => {

    // Array must contain more than 4 words
    if (words.length > 4) {

      const sortedWords = [...words].sort();

      resolve(sortedWords);

    } else {
      reject("Error: The array must contain more than 4 words.");
    }
  });
}


// ==========================================
// TEST 1
// ==========================================

makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));


// ==========================================
// TEST 2
// ==========================================

makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));


// ==========================================
// TEST 3
// ==========================================

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));