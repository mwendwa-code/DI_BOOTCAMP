// =====================================================
// 🌟 EXERCISE 1: GIPHY API #3
// =====================================================

const gifForm = document.getElementById("gifForm");
const categoryInput = document.getElementById("category");
const gifContainer = document.getElementById("gifContainer");
const deleteBtn = document.getElementById("deleteBtn");

const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Listen for form submission
gifForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = categoryInput.value.trim();

    if (category === "") {
        return;
    }

    fetchGifs(category);
});


// Function to fetch GIFs
async function fetchGifs(category) {
    try {
        const url =
            `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(category)}&rating=g&limit=10&api_key=${API_KEY}`;

        const response = await fetch(url);

        // Check response status
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Giphy data:", data);

        // Check if GIFs were found
        if (data.data.length === 0) {
            alert("No GIFs found.");
            return;
        }

        // Append relevant GIFs to the page
        data.data.forEach(gif => {
            const img = document.createElement("img");

            img.src = gif.images.original.url;
            img.alt = gif.title || category;

            gifContainer.appendChild(img);
        });

    } catch (error) {
        console.error("Error fetching GIFs:", error);
        alert("Something went wrong while fetching the GIFs.");
    }
}


// Delete all GIFs
deleteBtn.addEventListener("click", function () {
    gifContainer.innerHTML = "";
});


// =====================================================
// 🌟 EXERCISE 2: ANALYZE #4
// =====================================================

let resolveAfter2Seconds = function () {
    console.log("starting slow promise");

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};


let concurrentPromise = function () {
    console.log("==CONCURRENT START with Promise.all==");

    return Promise.all([
        resolveAfter2Seconds(),
        resolveAfter1Second()
    ]).then(messages => {

        console.log(messages[0]);
        console.log(messages[1]);

    });
};

setTimeout(concurrentPromise, 1000);


// =====================================================
// 🌟 EXERCISE 3: ANALYZE #5
// =====================================================

let parallel = async function () {
    console.log("==PARALLEL with await Promise.all==");

    await Promise.all([
        (async () => {
            console.log(await resolveAfter2Seconds());
        })(),

        (async () => {
            console.log(await resolveAfter1Second());
        })()
    ]);
};

setTimeout(parallel, 5000);


// =====================================================
// 🌟 EXERCISE 4: ANALYZE #6
// =====================================================

let parallelPromise = function () {
    console.log("==PARALLEL with Promise.then==");

    resolveAfter2Seconds()
        .then(message => console.log(message));

    resolveAfter1Second()
        .then(message => console.log(message));
};

setTimeout(parallelPromise, 13000)
