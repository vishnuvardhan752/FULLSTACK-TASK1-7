const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "order_management",
});

// 🔗 Get Order History
app.get("/orders", (req, res) => {
  const query = `
    SELECT c.name, p.product_name, o.quantity, o.order_date,
           (p.price * o.quantity) AS total_price
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
    JOIN Products p ON o.product_id = p.product_id
    ORDER BY o.order_date DESC
  `;
  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// 💰 Highest Order
app.get("/highest-order", (req, res) => {
  const query = `
    SELECT *
    FROM (
        SELECT o.order_id, c.name, (p.price * o.quantity) AS total_value
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        JOIN Products p ON o.product_id = p.product_id
    ) AS order_values
    ORDER BY total_value DESC
    LIMIT 1
  `;
  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result[0]);
  });
});

// 👑 Most Active Customer
app.get("/top-customer", (req, res) => {
  const query = `
    SELECT c.name, COUNT(o.order_id) AS total_orders
    FROM Customers c
    JOIN Orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id
    ORDER BY total_orders DESC
    LIMIT 1
  `;
  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result[0]);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});