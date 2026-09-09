```javascript
// Get the form
const form = document.getElementById("userForm");

// Get the output area
const output = document.getElementById("output");

// Listen for form submission
form.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the values from the inputs
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;

    // Create an object
    const user = {
        name: name,
        lastName: lastName
    };

    // Convert the object into a JSON string
    const jsonString = JSON.stringify(user);

    // Display the JSON string in the DOM
    output.textContent = jsonString;
});
```
