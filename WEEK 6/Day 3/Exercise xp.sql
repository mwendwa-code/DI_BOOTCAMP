-- Create the table for the new films
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert some sample movies
INSERT INTO new_film (name) VALUES
('Inception'),
('Interstellar'),
('The Matrix');

-- Create the review table with correct foreign key constraints
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    score SMALLINT NOT NULL CHECK (score BETWEEN 1 AND 10),
    review_text TEXT NOT NULL,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_film
        FOREIGN KEY (film_id) REFERENCES new_film(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_language
        FOREIGN KEY (language_id) REFERENCES language(language_id)
);

-- Add valid reviews
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
    (1, 1, 'Great movie', 9, 'Very interesting and exciting.'),
    (2, 2, 'Mind blowing', 10, 'Amazing visuals and a strong story.');

-- Show reviews before delete
SELECT *
FROM customer_review;

-- Delete a film from new_film
DELETE FROM new_film
WHERE id = 1;

-- After deletion, the review linked to film_id = 1 is deleted automatically
SELECT *
FROM customer_review;