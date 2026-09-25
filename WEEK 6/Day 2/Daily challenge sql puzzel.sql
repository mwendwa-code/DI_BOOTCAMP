-- SQL Puzzle: NULL behavior with NOT IN

CREATE TABLE FirstTab (
    id integer,
    name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

SELECT * FROM FirstTab;

CREATE TABLE SecondTab (
    id integer
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);

SELECT * FROM SecondTab;

-- Q1
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id IS NULL
);


-- Q2
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id = 5
);


-- Q3
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
);


-- Q4
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id IS NOT NULL
);

