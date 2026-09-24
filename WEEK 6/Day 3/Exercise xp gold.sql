-- =====================================================
-- Exercise 1: DVD Rentals
-- =====================================================

-- 1. Get a list of all rentals which are out (have not been returned)
SELECT *
FROM rental
WHERE return_date IS NULL;

-- 2. Get a list of all customers who have not returned their rentals, grouped
SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS outstanding_rentals
FROM customer c
JOIN rental r ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY c.customer_id;

-- 3. Get a list of all Action films with Joe Swank
-- Shortcut: maybe use a view if the table schema is reused often.
SELECT DISTINCT f.title, f.description
FROM film f
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category c ON c.category_id = fc.category_id
JOIN film_actor fa ON fa.film_id = f.film_id
JOIN actor a ON a.actor_id = fa.actor_id
WHERE c.name = 'Action'
  AND a.first_name = 'Joe'
  AND a.last_name = 'Swank';

-- =====================================================
-- Exercise 2 – Happy Halloween
-- =====================================================

-- 1. How many stores there are, and in which city and country they are located
SELECT s.store_id, ci.city, co.country
FROM store s
JOIN address a ON a.address_id = s.address_id
JOIN city ci ON ci.city_id = a.city_id
JOIN country co ON co.country_id = ci.country_id;

-- 2. How many hours of viewing time are in total in each store
SELECT s.store_id,
       SUM(f.length) AS total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS total_hours
FROM store s
JOIN inventory i ON i.store_id = s.store_id
JOIN film f ON f.film_id = i.film_id
LEFT JOIN rental r ON r.inventory_id = i.inventory_id AND r.return_date IS NULL
WHERE r.rental_id IS NULL
GROUP BY s.store_id
ORDER BY s.store_id;

-- 3. Exclude any inventory items which are not yet returned
-- This is already handled by the LEFT JOIN + r.rental_id IS NULL above.

-- 4. A list of all customers in the cities where the stores are located
SELECT DISTINCT c.customer_id, c.first_name, c.last_name, ci.city
FROM customer c
JOIN address a ON a.address_id = c.address_id
JOIN city ci ON ci.city_id = a.city_id
JOIN store s ON s.address_id = a.address_id
ORDER BY ci.city, c.last_name, c.first_name;

-- 5. A list of all customers in the countries where the stores are located
SELECT DISTINCT c.customer_id, c.first_name, c.last_name, co.country
FROM customer c
JOIN address a ON a.address_id = c.address_id
JOIN city ci ON ci.city_id = a.city_id
JOIN country co ON co.country_id = ci.country_id
JOIN store s ON s.address_id = a.address_id
ORDER BY co.country, c.last_name, c.first_name;

-- 6. Create a safe list of all movies which do not include the 'Horror' category,
--    or contain the words beast, monster, ghost, dead, zombie, or undead in title/description
SELECT f.film_id, f.title, f.description, f.length,
       CASE
           WHEN c.name = 'Horror' THEN 'unsafe'
           WHEN LOWER(f.title) LIKE '%beast%' OR LOWER(f.title) LIKE '%monster%' OR LOWER(f.title) LIKE '%ghost%' OR LOWER(f.title) LIKE '%dead%' OR LOWER(f.title) LIKE '%zombie%' OR LOWER(f.title) LIKE '%undead%'
                OR LOWER(f.description) LIKE '%beast%' OR LOWER(f.description) LIKE '%monster%' OR LOWER(f.description) LIKE '%ghost%' OR LOWER(f.description) LIKE '%dead%' OR LOWER(f.description) LIKE '%zombie%' OR LOWER(f.description) LIKE '%undead%'
           THEN 'unsafe'
           ELSE 'safe'
       END AS safety_status
FROM film f
LEFT JOIN film_category fc ON fc.film_id = f.film_id
LEFT JOIN category c ON c.category_id = fc.category_id
WHERE c.name IS NULL OR c.name <> 'Horror'
  AND NOT (
      LOWER(f.title) LIKE '%beast%' OR LOWER(f.title) LIKE '%monster%' OR LOWER(f.title) LIKE '%ghost%' OR LOWER(f.title) LIKE '%dead%' OR LOWER(f.title) LIKE '%zombie%' OR LOWER(f.title) LIKE '%undead%'
      OR LOWER(f.description) LIKE '%beast%' OR LOWER(f.description) LIKE '%monster%' OR LOWER(f.description) LIKE '%ghost%' OR LOWER(f.description) LIKE '%dead%' OR LOWER(f.description) LIKE '%zombie%' OR LOWER(f.description) LIKE '%undead%'
  );

-- Sum of viewing time for safe list
SELECT SUM(f.length) AS safe_total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS safe_total_hours,
       ROUND(SUM(f.length) / 1440.0, 2) AS safe_total_days
FROM film f
LEFT JOIN film_category fc ON fc.film_id = f.film_id
LEFT JOIN category c ON c.category_id = fc.category_id
WHERE (c.name IS NULL OR c.name <> 'Horror')
  AND NOT (
      LOWER(f.title) LIKE '%beast%' OR LOWER(f.title) LIKE '%monster%' OR LOWER(f.title) LIKE '%ghost%' OR LOWER(f.title) LIKE '%dead%' OR LOWER(f.title) LIKE '%zombie%' OR LOWER(f.title) LIKE '%undead%'
      OR LOWER(f.description) LIKE '%beast%' OR LOWER(f.description) LIKE '%monster%' OR LOWER(f.description) LIKE '%ghost%' OR LOWER(f.description) LIKE '%dead%' OR LOWER(f.description) LIKE '%zombie%' OR LOWER(f.description) LIKE '%undead%'
  );

-- 7. For both general and safe lists, calculate time in hours and days
SELECT 'general' AS list_type,
       SUM(f.length) AS total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
       ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM film f

UNION ALL

SELECT 'safe' AS list_type,
       SUM(f.length) AS total_minutes,
       ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
       ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM film f
LEFT JOIN film_category fc ON fc.film_id = f.film_id
LEFT JOIN category c ON c.category_id = fc.category_id
WHERE (c.name IS NULL OR c.name <> 'Horror')
  AND NOT (
      LOWER(f.title) LIKE '%beast%' OR LOWER(f.title) LIKE '%monster%' OR LOWER(f.title) LIKE '%ghost%' OR LOWER(f.title) LIKE '%dead%' OR LOWER(f.title) LIKE '%zombie%' OR LOWER(f.title) LIKE '%undead%'
      OR LOWER(f.description) LIKE '%beast%' OR LOWER(f.description) LIKE '%monster%' OR LOWER(f.description) LIKE '%ghost%' OR LOWER(f.description) LIKE '%dead%' OR LOWER(f.description) LIKE '%zombie%' OR LOWER(f.description) LIKE '%undead%'
  );
