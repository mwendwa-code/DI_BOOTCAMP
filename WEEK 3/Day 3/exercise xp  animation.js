// =========================================
// Exercise 1: Timer
// =========================================

// Part I: Alert after 2 seconds
const startPartI = document.getElementById("startPartI");
if (startPartI) {
  startPartI.addEventListener("click", function () {
    setTimeout(function () {
      alert("Hello World");
    }, 2000);
  });
}

// Part II: Add paragraph after 2 seconds
const startPartII = document.getElementById("startPartII");
if (startPartII) {
  startPartII.addEventListener("click", function () {
    setTimeout(function () {
      const container = document.getElementById("container");
      const paragraph = document.createElement("p");
      paragraph.textContent = "Hello World";
      container.appendChild(paragraph);
    }, 2000);
  });
}

// Part III: Add paragraph every 2 seconds
const startPartIII = document.getElementById("startPartIII");
const clearBtn = document.getElementById("clear");
const container = document.getElementById("container");
let intervalId;

if (startPartIII) {
  startPartIII.addEventListener("click", function () {
    intervalId = setInterval(function () {
      // Check if there are already 5 paragraphs
      const paragraphs = container.querySelectorAll("p");
      
      if (paragraphs.length >= 5) {
        clearInterval(intervalId);
        alert("5 paragraphs reached! Interval cleared.");
        return;
      }
      
      // Add a new paragraph
      const paragraph = document.createElement("p");
      paragraph.textContent = "Hello World";
      container.appendChild(paragraph);
    }, 2000);
  });
}

if (clearBtn) {
  // Clear the interval when the button is clicked
  clearBtn.addEventListener("click", function () {
    clearInterval(intervalId);
    alert("Interval cleared!");
  });
}

// =========================================
// Exercise 2: Move the box
// =========================================

function myMove() {
  const animate = document.getElementById("animate");
  const containerDiv = document.getElementById("container");
  
  if (!animate || !containerDiv) return;
  
  let pos = 0;
  
  // Get the maximum position (container width - box width)
  const maxPos = containerDiv.offsetWidth - animate.offsetWidth;
  
  const animateIntervalId = setInterval(function () {
    // Move the box 1px to the right
    pos += 1;
    animate.style.left = pos + "px";
    
    // Stop when the box reaches the right end of the container
    if (pos >= maxPos) {
      clearInterval(animateIntervalId);
    }
  }, 1); // Every 1 millisecond (move 1px per millisecond)
}
