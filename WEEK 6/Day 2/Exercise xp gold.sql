-- =====================================================
-- Exercise 1: DVD Rental
-- =====================================================

-- 1. Find out how many films there are for each rating
SELECT rating, COUNT(*) AS number_of_films
FROM film
GROUP BY rating
ORDER BY rating;

-- 2. Get a list of all movies with rating G or PG-13
SELECT *
FROM film
WHERE rating IN ('G', 'PG-13');

-- 3. Filter further: under 2 hours, rental_rate < 3.00, alphabetical order
SELECT title, length, rental_rate, rating
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

-- 4. Find a customer and update their details to your details
UPDATE customer
SET first_name = 'YourName',
    last_name = 'YourLastName',
    email = 'your@email.com'
WHERE customer_id = 1;

-- 5. Update the address of that customer to your address
UPDATE address
SET address = '123 Your Street',
    district = 'Your District',
    city_id = 1,
    phone = '1234567890'
WHERE address_id = 1;

-- =====================================================
-- Exercise 2: students table
-- =====================================================

-- This assumes the students table already exists from the previous exercise.

-- 1. Update birth dates for Lea and Marc Benichou
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea', 'Marc')
  AND last_name = 'Benichou';

-- 2. Change David's last name from Grez to Guez
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
  AND last_name = 'Grez';

-- 3. Delete Lea Benichou
DELETE FROM students
WHERE first_name = 'Lea'
  AND last_name = 'Benichou';

-- 4. Count all students
SELECT COUNT(*) AS total_students
FROM students;

-- 5. Count students born after 2000-01-01
SELECT COUNT(*) AS students_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- 6. Add a column called math_grade
ALTER TABLE students
ADD COLUMN math_grade INT;

-- 7. Add grade 80 to student id 1
UPDATE students
SET math_grade = 80
WHERE id = 1;

-- 8. Add grade 90 to students with ids 2 or 4
UPDATE students
SET math_grade = 90
WHERE id IN (2, 4);

-- 9. Add grade 40 to student id 6
UPDATE students
SET math_grade = 40
WHERE id = 6;

-- 10. Count how many students have a grade bigger than 83
SELECT COUNT(*) AS grade_over_83
FROM students
WHERE math_grade > 83;

-- 11. Add another student named Omer Simpson with the same birth date as the one already in table
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer', 'Simpson', '1998-04-22', 70);

-- 12. Count how many grades each student has
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name
ORDER BY first_name, last_name;

-- 13. Sum of all grade values
SELECT SUM(math_grade) AS total_grade_sum
FROM students;

-- =====================================================
-- Exercise 3: Items and customers
-- =====================================================

-- Part I
-- 1. Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity_purchased INT NOT NULL,
    CONSTRAINT fk_purchases_customer
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_purchases_item
        FOREIGN KEY (item_id) REFERENCES items(item_id)
);

-- Insert purchases using subqueries
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES
    ((SELECT customer_id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
     (SELECT item_id FROM items WHERE item_name = 'Fan'),
     1),

    ((SELECT customer_id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
     (SELECT item_id FROM items WHERE item_name = 'Large Desk'),
     10),

    ((SELECT customer_id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
     (SELECT item_id FROM items WHERE item_name = 'Small Desk'),
     2);

-- Part II
-- 1. All purchases
SELECT *
FROM purchases;

-- 2. All purchases joined with customers
SELECT p.id, c.first_name, c.last_name, p.item_id, p.quantity_purchased
FROM purchases p
JOIN customers c ON c.customer_id = p.customer_id;

-- 3. Purchases for customer with ID = 5
SELECT *
FROM purchases
WHERE customer_id = 5;

-- 4. Purchases for a large desk AND a small desk
SELECT *
FROM purchases
WHERE item_id IN (
    SELECT item_id FROM items WHERE item_name = 'Large Desk'
)
OR item_id IN (
    SELECT item_id FROM items WHERE item_name = 'Small Desk'
);

-- 5. Show customers who have made a purchase
SELECT c.first_name, c.last_name, i.item_name
FROM purchases p
JOIN customers c ON c.customer_id = p.customer_id
JOIN items i ON i.item_id = p.item_id;

-- 6. Add a row referencing a customer but leaving item blank (will fail)
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 3);

-- This does not work because item_id is defined as NOT NULL.
-- A foreign key with NULL is allowed only if the column itself is nullable,
-- but here it is NOT NULL, so the row cannot be inserted.
