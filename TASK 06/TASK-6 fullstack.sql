-- Create Schema
CREATE DATABASE audit_db;
USE audit_db;

-- Main Table
CREATE TABLE emp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);

-- Log Table
CREATE TABLE emp_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT,
    action VARCHAR(10),
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger (handles INSERT + UPDATE)
DELIMITER $$

CREATE TRIGGER emp_audit
AFTER INSERT ON emp
FOR EACH ROW
BEGIN
    INSERT INTO emp_log (emp_id, action)
    VALUES (NEW.id, 'INSERT');
END$$

CREATE TRIGGER emp_update_audit
AFTER UPDATE ON emp
FOR EACH ROW
BEGIN
    INSERT INTO emp_log (emp_id, action)
    VALUES (NEW.id, 'UPDATE');
END$$

DELIMITER ;

-- View (Daily Report)
CREATE VIEW daily_report AS
SELECT 
    DATE(log_time) AS date,
    COUNT(*) AS total_actions
FROM emp_log
GROUP BY DATE(log_time);

-- Test
INSERT INTO emp (name, salary) VALUES ('Ram', 30000);
UPDATE emp SET salary = 35000 WHERE id = 1;

-- Check
SELECT * FROM emp_log;
SELECT * FROM daily_report;