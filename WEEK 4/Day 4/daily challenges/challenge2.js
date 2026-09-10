// ==========================================
// DAILY CHALLENGE 2
// MORSE CODE
// ==========================================

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;


// ==========================================
// FUNCTION 1: toJs()
// Convert JSON string into JavaScript object
// ==========================================

function toJs() {

  return new Promise((resolve, reject) => {

    try {

      const morseJS = JSON.parse(morse);

      // Check if object is empty
      if (Object.keys(morseJS).length === 0) {

        reject("Error: Morse object is empty.");

      } else {

        resolve(morseJS);

      }

    } catch (error) {

      reject("Error: Could not convert Morse JSON to JavaScript object.");

    }

  });
}


// ==========================================
// FUNCTION 2: toMorse()
// Ask the user for text and translate it
// ==========================================

function toMorse(morseJS) {

  return new Promise((resolve, reject) => {

    const userInput = prompt("Enter a word or sentence:");

    // Check if user cancelled the prompt
    if (userInput === null) {
      reject("Error: No text was entered.");
      return;
    }

    const text = userInput.toLowerCase();

    const morseTranslation = [];

    // Check every character
    for (let character of text) {

      // Ignore spaces
      if (character === " ") {
        continue;
      }

      // Check if character exists
      if (!morseJS.hasOwnProperty(character)) {

        reject(
          `Error: The character "${character}" does not exist in the Morse object.`
        );

        return;
      }

      // Add Morse code to array
      morseTranslation.push(morseJS[character]);
    }

    resolve(morseTranslation);
  });
}


// ==========================================
// FUNCTION 3: joinWords()
// Display Morse code on the DOM
// ==========================================

function joinWords(morseTranslation) {

  const output = document.getElementById("output");

  // Join each Morse code on a new line
  output.textContent = morseTranslation.join("\n");
}


// ==========================================
// CHAIN THE THREE FUNCTIONS
// ==========================================

toJs()
  .then(morseJS => toMorse(morseJS))
  .then(morseTranslation => joinWords(morseTranslation))
  .catch(error => {

    console.log(error);

    document.getElementById("output").textContent = error;
  });