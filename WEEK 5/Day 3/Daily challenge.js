"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    books = [];
    getBooks() {
        return this.books;
    }
    addBook(book) {
        this.books.push(book);
    }
    getBookDetails(isbn) {
        return this.books.find((book) => book.isbn === isbn);
    }
}
class DigitalLibrary extends Library {
    website;
    constructor(website) {
        super();
        this.website = website;
    }
    listBooks() {
        return this.getBooks().map((book) => book.title);
    }
}
const digitalLibrary = new DigitalLibrary("https://example-library.com");
digitalLibrary.addBook({
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-261-10221-7",
    publishedYear: 1937,
    genre: "Fantasy",
});
digitalLibrary.addBook({
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-1-85326-000-0",
    publishedYear: 1813,
    genre: "Classic",
});
console.log("Book Details:");
console.log(digitalLibrary.getBookDetails("978-0-261-10221-7"));
console.log(digitalLibrary.getBookDetails("978-1-85326-000-0"));
console.log("All Book Titles:");
console.log(digitalLibrary.listBooks());
//# sourceMappingURL=Daily%20challenge.js.map