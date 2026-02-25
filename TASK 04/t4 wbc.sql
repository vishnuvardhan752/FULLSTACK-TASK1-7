
USE order_management;

-- Customers Table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Sample Data
INSERT INTO Customers (name, email) VALUES
('Arun', 'arun@email.com'),
('Priya', 'priya@email.com'),
('Rahul', 'rahul@email.com');

INSERT INTO Products (product_name, price) VALUES
('Laptop', 70000),
('Phone', 30000),
('Headphones', 2000);

INSERT INTO Orders (customer_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2025-01-01'),
(1, 3, 2, '2025-01-10'),
(2, 2, 1, '2025-01-05'),
(3, 3, 5, '2025-01-07'),
(2, 1, 1, '2025-01-15');

-- 🔗 Customer Order History (JOIN)
SELECT c.name, p.product_name, o.quantity, o.order_date,
       (p.price * o.quantity) AS total_price
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Products p ON o.product_id = p.product_id
ORDER BY o.order_date DESC;

-- 💰 Highest Value Order (Subquery)
SELECT *
FROM (
    SELECT o.order_id, c.name, (p.price * o.quantity) AS total_value
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
    JOIN Products p ON o.product_id = p.product_id
) AS order_values
ORDER BY total_value DESC
LIMIT 1;

-- 👑 Most Active Customer (Subquery)
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC
LIMIT 1;