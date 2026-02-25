
USE login_system;

-- Users Table
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert Sample Users
INSERT INTO Users (username, email, password) VALUES
('Arun', 'arun@email.com', '123456'),
('Priya', 'priya@email.com', 'password'),
('Rahul', 'rahul@email.com', 'rahul123');

-- Check Login (Used in backend)
SELECT * FROM Users
WHERE email = 'arun@email.com' AND password = '123456';