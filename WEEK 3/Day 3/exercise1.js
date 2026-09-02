// Exercise 1: Change the article

// 1. Retrieve the h1 and console.log it
const h1 = document.querySelector("article h1");
console.log("H1:", h1);

// 2. Remove the last paragraph in the article tag
const paragraphs = document.querySelectorAll("article p");
if (paragraphs.length > 0) {
  paragraphs[paragraphs.length - 1].remove();
}

// 3. Add event listener to change h2 background color to red when clicked
const h2 = document.querySelector("article h2");
if (h2) {
  h2.addEventListener("click", function () {
    h2.style.backgroundColor = "red";
  });
}

// 4. Add event listener to hide h3 when clicked
const h3 = document.querySelector("article h3");
if (h3) {
  h3.addEventListener("click", function () {
    h3.style.display = "none";
  });
}

// 5. Add button to make all paragraphs bold
const boldButton = document.getElementById("boldButton");
if (boldButton) {
  boldButton.addEventListener("click", function () {
    const allParagraphs = document.querySelectorAll("article p");
    allParagraphs.forEach(function (p) {
      p.style.fontWeight = "bold";
    });
  });
}

// 6. BONUS: When hovering on h1, set random font size between 0-100px
if (h1) {
  h1.addEventListener("mouseover", function () {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = randomSize + "px";
  });
}

// 7. BONUS: When hovering on 2nd paragraph, fade out
const allPara = document.querySelectorAll("article p");
if (allPara.length > 1) {
  allPara[1].addEventListener("mouseover", function () {
    allPara[1].classList.add("fade-out");
  });
  allPara[1].addEventListener("mouseout", function () {
    allPara[1].classList.remove("fade-out");
  });
}
