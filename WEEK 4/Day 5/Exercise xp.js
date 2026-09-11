// ==========================================
// 🌟 EXERCISE 1: GIPHY API
// ==========================================

const giphyUrl =
  "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(giphyUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log("EXERCISE 1 - Giphy Data:");
    console.log(data);
  })
  .catch(error => {
    console.error("EXERCISE 1 - Error:", error);
  });


// ==========================================
// 🌟 EXERCISE 2: GIPHY API - SUN GIFS
// ==========================================

const sunGiphyUrl =
  "https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(sunGiphyUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log("EXERCISE 2 - Sun GIFs:");
    console.log(data);
  })
  .catch(error => {
    console.error("EXERCISE 2 - Error:", error);
  });


// ==========================================
// 🌟 EXERCISE 3: ASYNC/AWAIT - STAR WARS
// ==========================================

async function getStarship() {
  try {
    const response = await fetch(
      "https://www.swapi.tech/api/starships/9/"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const objectStarWars = await response.json();

    console.log("EXERCISE 3 - Starship:");
    console.log(objectStarWars.result);
  } catch (error) {
    console.error("EXERCISE 3 - Error:", error);
  }
}

getStarship();


// ==========================================
// 🌟 EXERCISE 4: ANALYZE ASYNC/AWAIT
// ==========================================

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");

  let result = await resolveAfter2Seconds();

  console.log(result);
}

asyncCall();


