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
  database: "login_system",
});

// 🔐 Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const query = "SELECT * FROM Users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      res.json({ success: true, message: "Login successful", user: result[0] });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});