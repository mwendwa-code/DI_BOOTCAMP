// Exercise 3: Transform the sentence

// 1. Declare a global variable named allBoldItems
let allBoldItems = [];

// 2. Create a function called getBoldItems()
function getBoldItems() {
  const paragraph = document.querySelector("p");
  if (paragraph) {
    allBoldItems = paragraph.querySelectorAll("strong");
    console.log("Bold items found:", allBoldItems.length);
  }
}

// 3. Create a function called highlight()
function highlight() {
  allBoldItems.forEach(function (item) {
    item.style.color = "blue";
  });
}

// 4. Create a function called returnItemsToDefault()
function returnItemsToDefault() {
  allBoldItems.forEach(function (item) {
    item.style.color = "black";
  });
}

// 5. Add event listeners for mouseover and mouseout
const paragraph = document.querySelector("p");
if (paragraph) {
  getBoldItems(); // Initialize the array
  
  paragraph.addEventListener("mouseover", function () {
    highlight();
  });
  
  paragraph.addEventListener("mouseout", function () {
    returnItemsToDefault();
  });
}
