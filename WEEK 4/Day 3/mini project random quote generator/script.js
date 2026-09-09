// ==========================================
// PART 1: QUOTE ARRAY
// ==========================================

const quotes = [
    {
        id: 0,
        author: "Albert Einstein",
        quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        likes: 0
    },

    {
        id: 1,
        author: "Nelson Mandela",
        quote: "It always seems impossible until it's done.",
        likes: 0
    },

    {
        id: 2,
        author: "Steve Jobs",
        quote: "The only way to do great work is to love what you do.",
        likes: 0
    },

    {
        id: 3,
        author: "Walt Disney",
        quote: "The way to get started is to quit talking and begin doing.",
        likes: 0
    },

    {
        id: 4,
        author: "Maya Angelou",
        quote: "You will face many defeats in life, but never let yourself be defeated.",
        likes: 0
    },

    {
        id: 5,
        author: "Henry Ford",
        quote: "Whether you think you can or you think you can't, you're right.",
        likes: 0
    }
];


// ==========================================
// VARIABLES
// ==========================================

let currentQuote = null;
let previousQuoteId = null;

let filteredQuotes = [];
let currentFilterIndex = 0;


// ==========================================
// DOM ELEMENTS
// ==========================================

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const generateBtn = document.getElementById("generateBtn");

const charactersBtn =
    document.getElementById("charactersBtn");

const charactersNoSpacesBtn =
    document.getElementById("charactersNoSpacesBtn");

const wordsBtn =
    document.getElementById("wordsBtn");

const likeBtn =
    document.getElementById("likeBtn");

const charactersResult =
    document.getElementById("charactersResult");

const charactersNoSpacesResult =
    document.getElementById("charactersNoSpacesResult");

const wordsResult =
    document.getElementById("wordsResult");

const likesResult =
    document.getElementById("likesResult");

const addQuoteForm =
    document.getElementById("addQuoteForm");

const newQuoteInput =
    document.getElementById("newQuote");

const newAuthorInput =
    document.getElementById("newAuthor");

const filterForm =
    document.getElementById("filterForm");

const authorSearch =
    document.getElementById("authorSearch");

const filterResult =
    document.getElementById("filterResult");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");


// ==========================================
// PART 1: GENERATE RANDOM QUOTE
// ==========================================

function generateRandomQuote() {

    if (quotes.length === 0) {
        return;
    }

    let randomIndex;

    // Prevent the same quote twice in a row
    do {
        randomIndex =
            Math.floor(Math.random() * quotes.length);

    } while (
        quotes.length > 1 &&
        quotes[randomIndex].id === previousQuoteId
    );


    currentQuote = quotes[randomIndex];

    previousQuoteId = currentQuote.id;

    displayQuote(currentQuote);
}


// ==========================================
// DISPLAY QUOTE
// ==========================================

function displayQuote(quoteObject) {

    quoteElement.textContent =
        `"${quoteObject.quote}"`;

    authorElement.textContent =
        `— ${quoteObject.author}`;

    charactersResult.textContent = "";
    charactersNoSpacesResult.textContent = "";
    wordsResult.textContent = "";

    likesResult.textContent =
        `❤️ Likes: ${quoteObject.likes}`;
}


// ==========================================
// GENERATE BUTTON
// ==========================================

generateBtn.addEventListener(
    "click",
    generateRandomQuote
);


// ==========================================
// PART 2: CHARACTER COUNT
// ==========================================

charactersBtn.addEventListener(
    "click",
    function () {

        if (!currentQuote) {
            alert("Generate a quote first.");
            return;
        }

        const numberOfCharacters =
            currentQuote.quote.length;

        charactersResult.textContent =
            `Characters including spaces: ${numberOfCharacters}`;
    }
);


// ==========================================
// CHARACTER COUNT WITHOUT SPACES
// ==========================================

charactersNoSpacesBtn.addEventListener(
    "click",
    function () {

        if (!currentQuote) {
            alert("Generate a quote first.");
            return;
        }

        const numberOfCharacters =
            currentQuote.quote
                .replace(/\s/g, "")
                .length;

        charactersNoSpacesResult.textContent =
            `Characters without spaces: ${numberOfCharacters}`;
    }
);


// ==========================================
// WORD COUNT
// ==========================================

wordsBtn.addEventListener(
    "click",
    function () {

        if (!currentQuote) {
            alert("Generate a quote first.");
            return;
        }

        const numberOfWords =
            currentQuote.quote
                .trim()
                .split(/\s+/)
                .length;

        wordsResult.textContent =
            `Number of words: ${numberOfWords}`;
    }
);


// ==========================================
// LIKE BUTTON
// ==========================================

likeBtn.addEventListener(
    "click",
    function () {

        if (!currentQuote) {
            alert("Generate a quote first.");
            return;
        }

        currentQuote.likes++;

        likesResult.textContent =
            `❤️ Likes: ${currentQuote.likes}`;
    }
);


// ==========================================
// ADD NEW QUOTE
// ==========================================

addQuoteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const quoteText =
            newQuoteInput.value.trim();

        const authorText =
            newAuthorInput.value.trim();

        if (
            quoteText === "" ||
            authorText === ""
        ) {
            return;
        }


        // Give the new quote a unique ID
        const newId =
            quotes.length === 0
                ? 0
                : Math.max(...quotes.map(q => q.id)) + 1;


        const newQuoteObject = {
            id: newId,
            author: authorText,
            quote: quoteText,
            likes: 0
        };


        // Add quote to the array
        quotes.push(newQuoteObject);


        // Clear form
        newQuoteInput.value = "";
        newAuthorInput.value = "";


        alert(
            `Quote added successfully! ID: ${newId}`
        );
    }
);


// ==========================================
// PART 3: FILTER BY AUTHOR
// ==========================================

filterForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const searchAuthor =
            authorSearch.value.trim().toLowerCase();


        filteredQuotes =
            quotes.filter(function (quoteObject) {

                return quoteObject.author
                    .toLowerCase()
                    .includes(searchAuthor);

            });


        currentFilterIndex = 0;


        if (filteredQuotes.length === 0) {

            filterResult.textContent =
                "No quotes found for this author.";

            return;
        }


        displayFilteredQuote();
    }
);


// ==========================================
// DISPLAY FILTERED QUOTE
// ==========================================

function displayFilteredQuote() {

    if (filteredQuotes.length === 0) {
        return;
    }

    const quoteObject =
        filteredQuotes[currentFilterIndex];


    filterResult.textContent =
        `"${quoteObject.quote}" — ${quoteObject.author}`;


    updateNavigationButtons();
}


// ==========================================
// PREVIOUS BUTTON
// ==========================================

previousBtn.addEventListener(
    "click",
    function () {

        if (filteredQuotes.length === 0) {
            return;
        }


        if (currentFilterIndex > 0) {

            currentFilterIndex--;

            displayFilteredQuote();
        }
    }
);


// ==========================================
// NEXT BUTTON
// ==========================================

nextBtn.addEventListener(
    "click",
    function () {

        if (filteredQuotes.length === 0) {
            return;
        }


        if (
            currentFilterIndex <
            filteredQuotes.length - 1
        ) {

            currentFilterIndex++;

            displayFilteredQuote();
        }
    }
);


// ==========================================
// ENABLE / DISABLE NAVIGATION BUTTONS
// ==========================================

function updateNavigationButtons() {

    previousBtn.disabled =
        currentFilterIndex === 0;

    nextBtn.disabled =
        currentFilterIndex ===
        filteredQuotes.length - 1;
}


// ==========================================
// START WITH A RANDOM QUOTE
// ==========================================

generateRandomQuote();
