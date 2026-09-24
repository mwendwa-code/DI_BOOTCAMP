-- =====================================================
-- Exercise 1: Bonus Public Database (Continuation of XP)
-- =====================================================

-- 1. Fetch the last 2 customers in alphabetical order (A-Z) - exclude id
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 2;

-- 2. Delete all purchases made by Scott
DELETE FROM purchases
WHERE customer_id = (
    SELECT customer_id
    FROM customers
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);

-- 3. Does Scott still exist in customers table?
SELECT *
FROM customers
WHERE first_name = 'Scott' AND last_name = 'Scott';

-- 4. Find all purchases joined with customers so Scott's order still appears,
--    but with blank names instead of real names.
SELECT p.*, c.first_name, c.last_name
FROM purchases p
LEFT JOIN customers c ON c.customer_id = p.customer_id;

-- 5. Find all purchases joined with customers so Scott's order does NOT appear.
SELECT p.*, c.first_name, c.last_name
FROM purchases p
INNER JOIN customers c ON c.customer_id = p.customer_id;

-- Explanation:
-- LEFT JOIN keeps all rows from purchases, even if there is no matching customer.
-- INNER JOIN keeps only rows where a matching customer exists.
