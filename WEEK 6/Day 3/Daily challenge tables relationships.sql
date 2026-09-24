-- Part I: One-to-One relationship between Customer and Customer profile

DROP TABLE IF EXISTS customer_profile CASCADE;
DROP TABLE IF EXISTS customer CASCADE;

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT UNIQUE,
    CONSTRAINT fk_customer_profile_customer
        FOREIGN KEY (customer_id)
        REFERENCES Customer(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Customer (first_name, last_name)
VALUES
    ('John', 'Doe'),
    ('Jerome', 'Lalu'),
    ('Lea', 'Rive');

INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES
    (TRUE, (SELECT id FROM Customer WHERE first_name = 'John')),
    (FALSE, (SELECT id FROM Customer WHERE first_name = 'Jerome'));

-- 1) The first_name of the LoggedIn customers
SELECT c.first_name
FROM Customer c
JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

-- 2) All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile
SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id;

-- 3) The number of customers that are not LoggedIn
SELECT COUNT(*) AS number_of_customers_not_logged_in
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE COALESCE(cp.isLoggedIn, FALSE) = FALSE;

-- Part II: Many-to-Many relationship between Book and Student using Library

DROP TABLE IF EXISTS Library CASCADE;
DROP TABLE IF EXISTS Student CASCADE;
DROP TABLE IF EXISTS Book CASCADE;

CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

INSERT INTO Book (title, author)
VALUES
    ('Alice In Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To kill a mockingbird', 'Harper Lee');

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

INSERT INTO Student (name, age)
VALUES
    ('John', 12),
    ('Lera', 11),
    ('Patrick', 10),
    ('Bob', 14);

CREATE TABLE Library (
    book_fk_id INT NOT NULL,
    student_fk_id INT NOT NULL,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id),
    CONSTRAINT fk_library_book
        FOREIGN KEY (book_fk_id)
        REFERENCES Book(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_library_student
        FOREIGN KEY (student_fk_id)
        REFERENCES Student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES
    ((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM Student WHERE name = 'John'),
     '2022-02-15'),
    ((SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
     (SELECT student_id FROM Student WHERE name = 'Bob'),
     '2021-03-03'),
    ((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM Student WHERE name = 'Lera'),
     '2021-05-23'),
    ((SELECT book_id FROM Book WHERE title = 'Harry Potter'),
     (SELECT student_id FROM Student WHERE name = 'Bob'),
     '2021-08-12');

-- 1) Select all the columns from the junction table
SELECT *
FROM Library;

-- 2) Select the name of the student and the title of the borrowed books
SELECT s.name, b.title
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

-- 3) Select the average age of the children that borrowed the book Alice in Wonderland
SELECT AVG(s.age) AS average_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- 4) Delete a student from the Student table, what happened in the junction table?
DELETE FROM Student
WHERE name = 'John';

-- Because of ON DELETE CASCADE, the row(s) in Library referencing this student are automatically deleted.
SELECT *
FROM Library;
