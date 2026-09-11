// ==========================================
// GIPHY RANDOM GIF EXERCISE
// ==========================================

// Giphy API key
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Get HTML elements
const gifForm = document.getElementById("gifForm");
const categoryInput = document.getElementById("category");
const gifContainer = document.getElementById("gifContainer");
const deleteAllBtn = document.getElementById("deleteAllBtn");


// ==========================================
// FETCH ONE RANDOM GIF
// ==========================================

async function getRandomGif(category) {
    try {

        // Create the API URL
        const url =
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(category)}&rating=g`;

        // Make GET request
        const response = await fetch(url);

        // Check response status
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert response to JavaScript object
        const data = await response.json();

        console.log("Giphy response:", data);

        // Check that a GIF was returned
        if (!data.data || !data.data.images) {
            throw new Error("No GIF was found.");
        }

        // Get GIF URL from the images object
        const gifURL = data.data.images.original.url;

        // ==========================================
        // CREATE GIF CARD
        // ==========================================

        const gifCard = document.createElement("div");
        gifCard.classList.add("gif-card");

        // Create image
        const img = document.createElement("img");
        img.src = gifURL;
        img.alt = `${category} GIF`;

        // Create DELETE button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        deleteButton.classList.add("deleteBtn");

        // Delete only this GIF
        deleteButton.addEventListener("click", function () {
            gifCard.remove();
        });

        // Add image and button to card
        gifCard.appendChild(img);
        gifCard.appendChild(deleteButton);

        // Add card to page
        gifContainer.appendChild(gifCard);

    } catch (error) {
        console.error("Error:", error);

        alert("Sorry, something went wrong while fetching the GIF.");
    }
}


// ==========================================
// FORM SUBMISSION
// ==========================================

gifForm.addEventListener("submit", function (event) {

    // Stop page from refreshing
    event.preventDefault();

    // Get user's search
    const category = categoryInput.value.trim();

    // Make sure input isn't empty
    if (category === "") {
        alert("Please enter a category.");
        return;
    }

    // Fetch one random GIF
    getRandomGif(category);

    // Clear input
    categoryInput.value = "";
});


// ==========================================
// DELETE ALL GIFS
// ==========================================

deleteAllBtn.addEventListener("click", function () {

    // Remove every GIF from the page
    gifContainer.innerHTML = "";

});
