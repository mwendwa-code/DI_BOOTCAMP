-- =========================================
-- Exercise 1: Items and customers
-- =========================================

-- 1. All items, ordered by price (lowest to highest)
SELECT *
FROM items
ORDER BY price ASC;

-- 2. Items with a price above 80 (80 included), ordered by price (highest to lowest)
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- 3. The first 3 customers in alphabetical order of the first name (A-Z)
--    Exclude the primary key column from the results
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

-- 4. All last names (no other columns!), in reverse alphabetical order (Z-A)
SELECT last_name
FROM customers
ORDER BY last_name DESC;

-- =========================================
-- Exercise 2: dvdrental database
-- =========================================

-- 1. Select all columns from the customer table
SELECT *
FROM customer;

-- 2. Display names using alias full_name
SELECT first_name || ' ' || last_name AS full_name
FROM customer;

-- 3. Select all create_date values without duplicates
SELECT DISTINCT create_date
FROM customer;

-- 4. Display customer details ordered by first name descending
SELECT *
FROM customer
ORDER BY first_name DESC;

-- 5. Film ID, title, description, year of release and rental rate, ordered by rental rate ascending
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

-- 6. Address and phone number of all customers living in the Texas district
SELECT a.address, a.phone
FROM address a
WHERE a.district = 'Texas';

-- 7. Movie details where the movie id is either 15 or 150
SELECT *
FROM film
WHERE film_id IN (15, 150);

-- 8. Check if your favorite movie exists in the database
-- Replace 'Your Favorite Movie' with the actual title you want to check
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Your Favorite Movie';

-- 9. Get movies starting with the first two letters of your favorite movie
-- Replace 'Yo' with the first two letters of your movie title
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'Yo%';

-- 10. The 10 cheapest movies
SELECT *
FROM film
ORDER BY rental_rate ASC, film_id ASC
LIMIT 10;

-- 11. The next 10 cheapest movies
-- Bonus: alternative without LIMIT using ROW_NUMBER()
SELECT *
FROM (
    SELECT f.*, ROW_NUMBER() OVER (ORDER BY f.rental_rate ASC, f.film_id ASC) AS rn
    FROM film f
) AS ranked_films
WHERE rn BETWEEN 11 AND 20;

-- 12. Join customer and payment tables to get customer names + payment amount and date
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

-- 13. Get all movies that are not in inventory
SELECT f.*
FROM film f
LEFT JOIN inventory i ON i.film_id = f.film_id
WHERE i.inventory_id IS NULL;

-- 14. Find which city is in which country
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id
ORDER BY co.country, ci.city;

-- 15. Bonus: show customer payments ordered by staff member
SELECT p.staff_id, c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM payment p
JOIN customer c ON c.customer_id = p.customer_id
ORDER BY p.staff_id, c.customer_id;
