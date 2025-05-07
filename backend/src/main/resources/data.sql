
-- User roles
INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('CUSTOMER');

-- Sample users (password: "password" encrypted with BCrypt)
INSERT INTO users (full_name, login_name, password, mobile, email, address)
VALUES ('Admin User', 'admin', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '9876543210', 'admin@pickupkart.in', 'PickupKart HQ, Delhi');

INSERT INTO users (full_name, login_name, password, mobile, email, address)
VALUES ('Sample Customer', 'customer', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '9876543211', 'user2025@gmail.com', '123 Customer Street, Mumbai');

-- User role mappings
INSERT INTO user_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.login_name = 'admin' AND r.name = 'ADMIN';
INSERT INTO user_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.login_name = 'customer' AND r.name = 'CUSTOMER';

-- Sample products
INSERT INTO products (name, description, price, quantity, image_url)
VALUES ('Laptop', 'High performance gaming laptop', 75000.00, 10, 'laptop.jpg');

INSERT INTO products (name, description, price, quantity, image_url)
VALUES ('Smartphone', 'Latest Android smartphone', 45000.00, 20, 'smartphone.jpg');

INSERT INTO products (name, description, price, quantity, image_url)
VALUES ('Headphones', 'Noise cancelling wireless headphones', 8500.00, 30, 'headphones.jpg');

-- Sample courier services
INSERT INTO couriers (name, description, price_per_km, is_custom)
VALUES ('Express Delivery', 'Same day delivery', 25.00, false);

INSERT INTO couriers (name, description, price_per_km, is_custom)
VALUES ('Standard Delivery', '2-3 days delivery', 15.00, false);

INSERT INTO couriers (name, description, price_per_km, is_custom)
VALUES ('Economy Delivery', '5-7 days delivery', 10.00, false);

INSERT INTO couriers (name, description, price_per_km, is_custom)
VALUES ('Other', 'Custom courier service', 20.00, true);

-- Sample orders for customer
INSERT INTO orders (customer_id, product_id, courier_id, quantity, amount, status, order_date)
SELECT 
    (SELECT id FROM users WHERE login_name = 'customer'),
    (SELECT id FROM products WHERE name = 'Smartphone'),
    (SELECT id FROM couriers WHERE name = 'Express Delivery'),
    1,
    45000.00 + (SELECT price_per_km FROM couriers WHERE name = 'Express Delivery') * 10,
    'DELIVERED',
    DATE_SUB(NOW(), INTERVAL 30 DAY)
;

INSERT INTO orders (customer_id, product_id, courier_id, quantity, amount, status, order_date)
SELECT 
    (SELECT id FROM users WHERE login_name = 'customer'),
    (SELECT id FROM products WHERE name = 'Headphones'),
    (SELECT id FROM couriers WHERE name = 'Standard Delivery'),
    1,
    8500.00 + (SELECT price_per_km FROM couriers WHERE name = 'Standard Delivery') * 10,
    'SHIPPED',
    DATE_SUB(NOW(), INTERVAL 2 DAY)
;

-- Sample payments
INSERT INTO payments (order_id, payment_mode, payment_amount, status, payment_date, transaction_id)
SELECT 
    (SELECT id FROM orders ORDER BY id LIMIT 1),
    'CARD',
    (SELECT amount FROM orders ORDER BY id LIMIT 1),
    'COMPLETED',
    (SELECT order_date FROM orders ORDER BY id LIMIT 1),
    CONCAT('TXN', FLOOR(RAND() * 1000000))
;
