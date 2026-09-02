// =========================================
// Exercise 1: Change the article
// =========================================

// 1. Retrieve the h1 and console.log it
const h1 = document.querySelector("article h1");
console.log("H1:", h1);

// 2. Remove the last paragraph in the article tag
const paragraphs = document.querySelectorAll("article p");
if (paragraphs.length > 0) {
  paragraphs[paragraphs.length - 1].remove();
}

// 3. Add event listener to change h2 background color to red when clicked
const h2 = document.querySelector("article h2");
if (h2) {
  h2.addEventListener("click", function () {
    h2.style.backgroundColor = "red";
  });
}

// 4. Add event listener to hide h3 when clicked
const h3 = document.querySelector("article h3");
if (h3) {
  h3.addEventListener("click", function () {
    h3.style.display = "none";
  });
}

// 5. Add button to make all paragraphs bold
const boldButton = document.getElementById("boldButton");
if (boldButton) {
  boldButton.addEventListener("click", function () {
    const allParagraphs = document.querySelectorAll("article p");
    allParagraphs.forEach(function (p) {
      p.style.fontWeight = "bold";
    });
  });
}

// 6. BONUS: When hovering on h1, set random font size between 0-100px
if (h1) {
  h1.addEventListener("mouseover", function () {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = randomSize + "px";
  });
}

// 7. BONUS: When hovering on 2nd paragraph, fade out
const allPara = document.querySelectorAll("article p");
if (allPara.length > 1) {
  allPara[1].addEventListener("mouseover", function () {
    allPara[1].classList.add("fade-out");
  });
  allPara[1].addEventListener("mouseout", function () {
    allPara[1].classList.remove("fade-out");
  });
}

// =========================================
// Exercise 2: Work with forms
// =========================================

// 1. Retrieve the form and console.log it
const form = document.querySelector("form");
console.log("Form:", form);

// 2. Retrieve the inputs by their id and console.log them
const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
console.log("First name input (by id):", fnameInput);
console.log("Last name input (by id):", lnameInput);

// 3. Retrieve the inputs by their name attribute and console.log them
const firstnameInput = document.querySelector("input[name='firstname']");
const lastnameInput = document.querySelector("input[name='lastname']");
console.log("First name input (by name):", firstnameInput);
console.log("Last name input (by name):", lastnameInput);

// 4. Add submit event listener
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents page reload
    
    const firstName = fnameInput.value.trim();
    const lastName = lnameInput.value.trim();
    
    // Check if inputs are not empty
    if (firstName === "" || lastName === "") {
      alert("Please fill in all fields!");
      return;
    }
    
    // Create li elements and append them to the ul
    const usersList = document.querySelector(".usersAnswer");
    
    const fnameLi = document.createElement("li");
    fnameLi.textContent = firstName;
    usersList.appendChild(fnameLi);
    
    const lnameLi = document.createElement("li");
    lnameLi.textContent = lastName;
    usersList.appendChild(lnameLi);
    
    // Clear the form
    form.reset();
  });
}

// =========================================
// Exercise 3: Transform the sentence
// =========================================

// 1. Declare a global variable named allBoldItems
let allBoldItems = [];

// 2. Create a function called getBoldItems()
function getBoldItems() {
  const paragraph = document.querySelector("p:has(strong)");
  if (paragraph) {
    allBoldItems = document.querySelectorAll("p strong");
    console.log("Bold items:", allBoldItems);
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
const paragraph = document.querySelector("p:has(strong)");
if (paragraph) {
  getBoldItems(); // Initialize the array
  
  paragraph.addEventListener("mouseover", function () {
    highlight();
  });
  
  paragraph.addEventListener("mouseout", function () {
    returnItemsToDefault();
  });
}

// =========================================
// Exercise 4: Volume of a sphere
// =========================================

// Get the form
const sphereForm = document.getElementById("MyForm");

if (sphereForm) {
  sphereForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const radiusInput = document.getElementById("radius");
    const volumeInput = document.getElementById("volume");
    
    const radius = parseFloat(radiusInput.value);
    
    // Check if radius is a valid positive number
    if (isNaN(radius) || radius <= 0) {
      alert("Please enter a valid positive number for radius!");
      return;
    }
    
    // Calculate volume of a sphere: V = (4/3) * π * r³
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    
    // Display the result
    volumeInput.value = volume.toFixed(2);
  });
}
