// Exercise 7: My Book List - DOM Rendering

const allBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    image: "https://images-na.ssl-images-amazon.com/images/P/0590353403.01.L.jpg",
    alreadyRead: true,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    image: "https://images-na.ssl-images-amazon.com/images/P/0544003411.01.L.jpg",
    alreadyRead: false,
  },
];

function displayBooks() {
  const section = document.querySelector(".listBooks");

  for (let book of allBooks) {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-div";

    // Create title with author
    const bookInfo = document.createElement("h3");
    bookInfo.textContent = `${book.title} written by ${book.author}`;

    if (book.alreadyRead) {
      bookInfo.style.color = "red";
    }

    // Create image
    const image = document.createElement("img");
    image.src = book.image;
    image.style.width = "100px";
    image.alt = book.title;

    // Append to book div
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(image);

    // Append to section
    section.appendChild(bookDiv);
  }
}

// Call the function to display books
displayBooks();
