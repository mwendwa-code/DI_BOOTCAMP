CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    number_oscars INT NOT NULL DEFAULT 0
);

INSERT INTO actors (first_name, last_name, age, number_oscars) VALUES
    ('Matt', 'Damon', '1970-10-08', 1),
    ('George', 'Clooney', '1961-05-06', 2),
    ('Meryl', 'Streep', '1949-06-22', 3),
    ('Angelina', 'Jolie', '1975-06-04', 1);

SELECT COUNT(*) AS total_actors FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES ('Will', 'Smith', '1968-09-25', 1);

SELECT * FROM actors;

SELECT * FROM actors 
WHERE number_oscars > 1;

SELECT * FROM actors 
WHERE age < '1970-01-01';

SELECT * FROM actors 
WHERE last_name LIKE 'D%';

UPDATE actors 
SET number_oscars = number_oscars + 1 
WHERE last_name = 'Damon';

DELETE FROM actors 
WHERE last_name = 'Smith';