const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ✅ Proper CORS Setup
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "veltech_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.post("/register", (req, res) => {

    const { name, email, dob, department, phone } = req.body;

    const sql = "INSERT INTO students (name, email, dob, department, phone) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, email, dob, department, phone], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Insert failed");
        } else {
            res.send("Student Registered Successfully");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});