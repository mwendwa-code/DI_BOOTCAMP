// =========================================
// Exercise 1: Find the numbers divisible by 23
// =========================================
function displayNumbersDivisible(divisor = 23) {
  let numbers = [];
  let sum = 0;
  
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      numbers.push(i);
      sum += i;
    }
  }
  
  console.log(numbers.join(" "));
  console.log("Sum :", sum);
}

// Test Exercise 1
displayNumbersDivisible();
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// =========================================
// Exercise 2: Shopping List
// =========================================
const stock = {
  banana: 6,
  apple: 0,
  pear: 12,
  orange: 32,
  blueberry: 1
};

const prices = {
  banana: 4,
  apple: 2,
  pear: 1,
  orange: 1.5,
  blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;
  
  for (let item of shoppingList) {
    if (item in stock && stock[item] > 0) {
      total += prices[item];
      stock[item]--;
    }
  }
  
  return total;
}

// Test Exercise 2
console.log("Bill total:", myBill());
console.log("Stock after purchase:", stock);

// =========================================
// Exercise 3: What's in my wallet?
// =========================================
function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  let totalChange = 0;
  
  for (let i = 0; i < amountOfChange.length; i++) {
    totalChange += amountOfChange[i] * coinValues[i];
  }
  
  return totalChange >= itemPrice;
}

// Test Exercise 3
console.log(changeEnough(4.25, [25, 20, 5, 0]));      // true
console.log(changeEnough(14.11, [2, 100, 0, 0]));     // false
console.log(changeEnough(0.75, [0, 0, 20, 5]));       // true

// =========================================
// Exercise 4: Vacation Costs
// =========================================
function hotelCost(nights) {
  if (nights === undefined) {
    while (true) {
      nights = Number(prompt("How many nights would you like to stay?"));
      if (!isNaN(nights) && nights > 0) break;
      alert("Please enter a valid number!");
    }
  }
  return nights * 140;
}

function planeRideCost(destination) {
  if (destination === undefined) {
    while (true) {
      destination = prompt("Where are you going?");
      if (destination && typeof destination === "string" && destination.trim() !== "") break;
      alert("Please enter a valid destination!");
    }
  }
  
  const dest = destination.toLowerCase();
  if (dest === "london") return 183;
  if (dest === "paris") return 220;
  return 300;
}

function rentalCarCost(days) {
  if (days === undefined) {
    while (true) {
      days = Number(prompt("How many days would you like to rent a car?"));
      if (!isNaN(days) && days > 0) break;
      alert("Please enter a valid number!");
    }
  }
  
  let cost = days * 40;
  if (days > 10) {
    cost *= 0.95; // 5% discount
  }
  return cost;
}

function totalVacationCost() {
  const nights = Number(prompt("How many nights would you like to stay?"));
  const destination = prompt("Where are you going?");
  const rentalDays = Number(prompt("How many days would you like to rent a car?"));
  
  const hotel = hotelCost(nights);
  const plane = planeRideCost(destination);
  const car = rentalCarCost(rentalDays);
  
  const total = hotel + plane + car;
  console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
  console.log(`Total vacation cost: $${total}`);
  
  return total;
}

// Uncomment to test Exercise 4:
// totalVacationCost();

// =========================================
// Exercise 5: Users (DOM Manipulation)
// =========================================
// This requires the HTML file with the structure:
// <div id="container">Users:</div>
// <ul class="list">
//     <li>John</li>
//     <li>Pete</li>
// </ul>
// <ul class="list">
//     <li>David</li>
//     <li>Sarah</li>
//     <li>Dan</li>
// </ul>

function ex5() {
  // Part 1: Retrieve and modify list items
  const container = document.getElementById("container");
  console.log(container);
  
  const lists = document.querySelectorAll(".list");
  
  // 1. Change "Pete" to "Richard"
  const pete = lists[0].querySelectorAll("li")[1];
  pete.textContent = "Richard";
  
  // 2. Delete the second <li> of the second <ul> (Sarah)
  const secondList = lists[1];
  secondList.querySelectorAll("li")[1].remove();
  
  // 3. Change first <li> of each <ul> to your name
  for (let list of lists) {
    list.querySelectorAll("li")[0].textContent = "YourName";
  }
  
  // Part 2: Add classes
  // 1. Add "student_list" to both ULs
  for (let list of lists) {
    list.classList.add("student_list");
  }
  
  // 2. Add "university" and "attendance" to first UL
  lists[0].classList.add("university", "attendance");
  
  // Part 3: Styling
  // 1. Add light blue background and padding to div
  container.style.backgroundColor = "lightblue";
  container.style.padding = "20px";
  
  // 2. Hide "Dan" (last <li> of second <ul>)
  const danLi = lists[1].querySelectorAll("li")[1]; // After Sarah deletion
  danLi.style.display = "none";
  
  // 3. Add border to "Richard"
  pete.style.border = "2px solid black";
  
  // 4. Change body font size
  document.body.style.fontSize = "18px";
  
  // 5. Bonus: Alert message
  if (container.style.backgroundColor === "lightblue") {
    alert("Hello YourName and YourName");
  }
}

// Uncomment to test Exercise 5:
// ex5();

// =========================================
// Exercise 6: Change the navbar (DOM)
// =========================================
// This requires the HTML file with the structure:
// <div id="navBar">
//     <ul>
//         <li><a href="#">Profile</a></li>
//         <li><a href="#">Home</a></li>
//         <li><a href="#">My Friends</a></li>
//         <li><a href="#">Messenger</a></li>
//         <li><a href="#">My Pics</a></li>
//     </ul>
// </div>

function ex6() {
  // 1. Change navBar id to socialNetworkNavigation
  const navBar = document.getElementById("navBar");
  navBar.setAttribute("id", "socialNetworkNavigation");
  
  // 2. Add new Logout <li>
  const ul = navBar.querySelector("ul");
  
  const newLi = document.createElement("li");
  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.textContent = "Logout";
  newLi.appendChild(logoutLink);
  ul.appendChild(newLi);
  
  // 3. Get first and last <li> and display their text
  const firstLi = ul.firstElementChild;
  const lastLi = ul.lastElementChild;
  console.log("First link:", firstLi.textContent);
  console.log("Last link:", lastLi.textContent);
}

// Uncomment to test Exercise 6:
// ex6();

// =========================================
// Exercise 7: My Book List (DOM)
// =========================================
// This requires the HTML file with:
// <section class="listBooks"></section>

const allBooks = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    image: "https://images-na.ssl-images-amazon.com/images/P/0590353403.01.L.jpg",
    alreadyRead: true
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    image: "https://images-na.ssl-images-amazon.com/images/P/0544003411.01.L.jpg",
    alreadyRead: false
  }
];

function displayBooks() {
  const section = document.querySelector(".listBooks");
  
  for (let book of allBooks) {
    const bookDiv = document.createElement("div");
    
    // Create title with author
    const bookInfo = document.createElement("h3");
    bookInfo.textContent = `${book.title} written by ${book.author}`;
    
    if (book.alreadyRead) {
      bookInfo.style.color = "red";
    }
    
    // Create image
    const image = document.createElement("img");
    image.src = book.image;
    image.style.width = "100px";
    
    // Append to book div
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(image);
    
    // Append to section
    section.appendChild(bookDiv);
  }
}

// Uncomment to test Exercise 7:
// displayBooks();
