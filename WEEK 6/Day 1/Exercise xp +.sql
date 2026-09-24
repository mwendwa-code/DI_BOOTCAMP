CREATE DATABASE IF NOT EXISTS bootcamp;
USE bootcamp;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL
);

-- Insert the provided students in a single efficient multi-row insert
INSERT INTO students (first_name, last_name, birth_date)
VALUES
    ('Marc', 'Benichou', '1998-11-02'),
    ('Yoan', 'Cohen', '2010-12-03'),
    ('Lea', 'Benichou', '1987-07-27'),
    ('Amelia', 'Dux', '1996-04-07'),
    ('David', 'Grez', '2003-06-14'),
    ('Omer', 'Simpson', '1980-10-03');

-- Insert your own data (replace the placeholder values)
INSERT INTO students (first_name, last_name, birth_date)
VALUES ('YourFirstName', 'YourLastName', 'YYYY-MM-DD');

-- 1. Fetch all data
SELECT * FROM students;

-- 2. Fetch all first names and last names
SELECT first_name, last_name FROM students;

-- 3. Only fetch first names and last names
-- 3.1 Fetch the student whose id is 2
SELECT first_name, last_name FROM students WHERE id = 2;

-- 3.2 Fetch the student whose last_name is Benichou AND first_name is Marc
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' AND first_name = 'Marc';

-- 3.3 Fetch the students whose last_names are Benichou OR first_names are Marc
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' OR first_name = 'Marc';

-- 3.4 Fetch the students whose first_names contain the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a%';

-- 3.5 Fetch the students whose first_names start with the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE 'a%';

-- 3.6 Fetch the students whose first_names end with the letter a
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a';

-- 3.7 Fetch the students whose second to last letter of their first_names is a
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a_';

-- 3.8 Fetch the students whose ids are equal to 1 AND 3
SELECT first_name, last_name FROM students WHERE id IN (1, 3);

-- 4. Fetch the students whose birth_dates are equal to or come after 2000-01-01
SELECT * FROM students WHERE birth_date >= '2000-01-01';
