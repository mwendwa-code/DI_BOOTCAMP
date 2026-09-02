// =========================================
// Exercise 1: Select a kind of Music
// =========================================

const genres = document.getElementById("genres");

// 1. Display the value of the selected option
console.log("Selected genre:", genres.value);

// 2 & 3. Add a new option and set it as selected
const newOption = document.createElement("option");
newOption.value = "classic";
newOption.textContent = "Classic";
newOption.selected = true;
genres.appendChild(newOption);

// Show the newly selected option
console.log("Updated selected genre:", genres.value);

// =========================================
// Exercise 2: Delete colors
// =========================================

const colorSelect = document.getElementById("colorSelect");
const removeButton = document.querySelector("input[type='button']");

function removecolor() {
  // Get the selected index
  const selectedIndex = colorSelect.selectedIndex;
  
  // Remove the selected option
  if (selectedIndex > -1) {
    colorSelect.remove(selectedIndex);
  }
}

// Add click event listener to the button
if (removeButton) {
  removeButton.addEventListener("click", removecolor);
}

// =========================================
// Exercise 3: Create a shopping list
// =========================================

let shoppingList = [];

// Get the root element
const root = document.getElementById("root");

if (root) {
  // 2. Create a form with text input and AddItem button
  const form = document.createElement("form");
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter item to buy";
  input.id = "itemInput";
  
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "AddItem";
  
  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "ClearAll";
  
  form.appendChild(input);
  form.appendChild(addButton);
  form.appendChild(clearButton);
  root.appendChild(form);
  
  // Create a list to display items
  const listDiv = document.createElement("div");
  listDiv.id = "shoppingListDisplay";
  root.appendChild(listDiv);
  
  // 3. Create addItem() function
  function addItem() {
    const itemInput = document.getElementById("itemInput");
    const item = itemInput.value.trim();
    
    if (item === "") {
      alert("Please enter an item!");
      return;
    }
    
    // Add to array
    shoppingList.push(item);
    
    // Clear input
    itemInput.value = "";
    
    // Display updated list
    displayList();
  }
  
  // 4. Create clearAll() function
  function clearAll() {
    shoppingList = [];
    displayList();
  }
  
  // Helper function to display the list
  function displayList() {
    const listDiv = document.getElementById("shoppingListDisplay");
    listDiv.innerHTML = "";
    
    if (shoppingList.length === 0) {
      listDiv.innerHTML = "<p>Shopping list is empty</p>";
      return;
    }
    
    const ul = document.createElement("ul");
    shoppingList.forEach(function (item, index) {
      const li = document.createElement("li");
      li.textContent = (index + 1) + ". " + item;
      ul.appendChild(li);
    });
    listDiv.appendChild(ul);
  }
  
  // Add event listeners
  addButton.addEventListener("click", addItem);
  clearButton.addEventListener("click", clearAll);
  
  // Allow Enter key to add items
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addItem();
    }
  });
}
