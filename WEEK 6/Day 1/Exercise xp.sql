-- Exercise 1 : Items and customers

-- 1. Create the database
CREATE DATABASE public;

-- Connect to the new database
\c public;

-- 2. Create tables
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- 3. Insert data into items
INSERT INTO items (id, item_name, price)
VALUES
    (1, 'Small Desk', 100),
    (2, 'Large desk', 300),
    (3, 'Fan', 80);

-- 4. Insert data into customers
INSERT INTO customers (id, first_name, last_name)
VALUES
    (1, 'Greg', 'Jones'),
    (2, 'Sandra', 'Jones'),
    (3, 'Scott', 'Scott'),
    (4, 'Trevor', 'Green'),
    (5, 'Melanie', 'Johnson');

-- 5. Fetch data from the database
-- 5.1 All the items
SELECT * FROM items;

-- 5.2 All items with a price above 80 (80 not included)
SELECT * FROM items WHERE price > 80;

-- 5.3 All items with a price below 300 (300 included)
SELECT * FROM items WHERE price <= 300;

-- 5.4 All customers whose last name is 'Smith'
-- Outcome: no rows will be returned, because no customer has the last name 'Smith'.
SELECT * FROM customers WHERE last_name = 'Smith';

-- 5.5 All customers whose last name is 'Jones'
SELECT * FROM customers WHERE last_name = 'Jones';

-- 5.6 All customers whose first name is not 'Scott'
SELECT * FROM customers WHERE first_name <> 'Scott';
