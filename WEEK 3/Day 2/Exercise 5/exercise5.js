// Exercise 5: Users - DOM Manipulation

// Part 1: Retrieve and modify list items
const container = document.getElementById("container");
console.log(container);

const lists = document.querySelectorAll(".list");

// 1. Change "Pete" to "Richard"
const pete = lists[0].children[1];
pete.textContent = "Richard";

// 2. Delete the second <li> of the second <ul> (Sarah)
const secondList = lists[1];
secondList.children[1].remove();

// 3. Change first <li> of each <ul> to your name
for (let list of lists) {
  list.children[0].textContent = "YourName";
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
const danLi = lists[1].children[1]; // After Sarah deletion
danLi.style.display = "none";

// 3. Add border to "Richard"
pete.style.border = "2px solid black";

// 4. Change body font size
document.body.style.fontSize = "18px";

// 5. Bonus: Alert message
if (container.style.backgroundColor === "lightblue") {
  alert("Hello YourName and YourName");
}
