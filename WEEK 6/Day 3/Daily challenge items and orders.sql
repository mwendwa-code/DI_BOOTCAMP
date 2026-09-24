-- Part 1: Create tables

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    CONSTRAINT fk_product_orders_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_items_product_orders
        FOREIGN KEY (order_id)
        REFERENCES product_orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Example data
INSERT INTO users (username, email)
VALUES
    ('John', 'john@example.com'),
    ('Alice', 'alice@example.com');

INSERT INTO product_orders (user_id, order_date, status)
VALUES
    (1, '2024-02-15 10:00:00', 'completed'),
    (2, '2024-02-16 11:00:00', 'pending');

INSERT INTO items (order_id, item_name, quantity, price)
VALUES
    (1, 'Laptop', 1, 1200.00),
    (1, 'Mouse', 2, 25.50),
    (2, 'Keyboard', 1, 75.00),
    (2, 'Monitor', 1, 300.00);

-- Function: total price for a given order
CREATE OR REPLACE FUNCTION get_total_price_for_order(p_order_id INT)
RETURNS NUMERIC AS $$
SELECT COALESCE(SUM(price * quantity), 0)
FROM items
WHERE order_id = p_order_id;
$$ LANGUAGE SQL;

-- Function: total price for a given order of a given user
CREATE OR REPLACE FUNCTION get_total_price_for_user_order(p_user_id INT, p_order_id INT)
RETURNS NUMERIC AS $$
SELECT COALESCE(SUM(i.price * i.quantity), 0)
FROM items i
JOIN product_orders po ON po.order_id = i.order_id
WHERE po.user_id = p_user_id
  AND po.order_id = p_order_id;
$$ LANGUAGE SQL;

-- Check the functions
SELECT get_total_price_for_order(1) AS total_for_order_1;
SELECT get_total_price_for_user_order(1, 1) AS total_for_user_1_order_1;
SELECT get_total_price_for_user_order(2, 2) AS total_for_user_2_order_2;

-- Optional queries to display the relationship clearly
SELECT * FROM users;
SELECT * FROM product_orders;
SELECT * FROM items;
