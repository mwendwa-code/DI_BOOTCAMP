// Exercise 2: Work with forms

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
    event.preventDefault(); // Prevents page reload - why? Because it keeps data on the page instead of submitting to a server
    
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
