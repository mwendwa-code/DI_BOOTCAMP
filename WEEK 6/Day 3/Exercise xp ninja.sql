-- =====================================================
-- Exercise 1: DVD Rentals (Family / Kids)
-- =====================================================

-- 1. Retrieve all films with rating G or PG, which are not currently rented
--    (returned or never borrowed)
SELECT f.film_id, f.title, f.rating, f.length, f.rental_rate
FROM film f
LEFT JOIN inventory i ON i.film_id = f.film_id
LEFT JOIN rental r ON r.inventory_id = i.inventory_id AND r.return_date IS NULL
WHERE f.rating IN ('G', 'PG')
  AND r.rental_id IS NULL
GROUP BY f.film_id, f.title, f.rating, f.length, f.rental_rate
ORDER BY f.title;

-- 2. Create a waiting list table for children's movies
--    A child can add their name until the film becomes available again.
--    It should reference the film and maybe the customer, if you want to link it to a customer.
CREATE TABLE waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_waiting_film
        FOREIGN KEY (film_id) REFERENCES film(film_id)
);

-- Example rows to test the waiting list
INSERT INTO waiting_list (film_id, child_name)
VALUES
    (1, 'Alice'),
    (1, 'Bob'),
    (2, 'Charlie');

-- 3. Retrieve the number of people waiting for each children's DVD
SELECT f.film_id, f.title, COUNT(w.waiting_id) AS people_waiting
FROM film f
LEFT JOIN waiting_list w ON w.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title
ORDER BY f.title;

-- If you want to check only a single movie:
SELECT film_id, COUNT(*) AS people_waiting
FROM waiting_list
WHERE film_id = 1
GROUP BY film_id;
