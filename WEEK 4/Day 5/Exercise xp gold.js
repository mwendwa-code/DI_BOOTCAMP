// =====================================================
// 🌟 EXERCISE 1: GIPHY API #2
// =====================================================

// Giphy API URL
const giphyURL =
  "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Fetch GIF data
fetch(giphyURL)
  .then(response => {
    // Check response status
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log("Giphy data:", data);

    // Get all GIFs
    const gifs = data.data;

    // Choose one random GIF
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    // Get the GIF URL from the images object
    const gifURL = randomGif.images.original.url;

    // Create an image element
    const img = document.createElement("img");

    // Add GIF URL
    img.src = gifURL;

    // Add alternative text
    img.alt = "Random Giphy GIF";

    // Add GIF to the webpage
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error("Error fetching GIF:", error);
  });


// =====================================================
// 🌟 EXERCISE 2: ANALYZE #2
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

let sequentialStart = async function () {
  console.log("==SEQUENTIAL START==");

  const slow = await resolveAfter2Seconds();
  console.log(slow);

  const fast = await resolveAfter1Second();
  console.log(fast);
};

sequentialStart();


// =====================================================
// 🌟 EXERCISE 3: ANALYZE #3
// =====================================================

let concurrentStart = async function () {
  console.log("==CONCURRENT START with await==");

  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();

  console.log(await slow);
  console.log(await fast);
};

// Start after 4 seconds
setTimeout(concurrentStart, 4000);


// =====================================================
// 🌟 EXERCISE 4: MODIFY FETCH WITH ASYNC/AWAIT
// =====================================================

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function () {
  try {
    // Fetch all URLs concurrently
    const responses = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);

        // Check response status
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
      })
    );

    // Store the results
    const [users, posts, albums] = responses;

    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);

  } catch (error) {
    console.log("ooooooops");
    console.error(error);
  }
};

getData();
