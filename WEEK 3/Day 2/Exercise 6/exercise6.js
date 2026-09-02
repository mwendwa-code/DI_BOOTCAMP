// Exercise 6: Change the navbar - DOM Manipulation

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
