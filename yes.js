const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files like HTML from "public" folder
app.use(express.static('public'));

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change to your MySQL user
  password: '',         // your password here
  database: 'test_db'   // your DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

// Handle POST form submission
app.post('/register', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  db.query(sql, [name, age], (err, result) => {
    if (err) throw err;
    res.send('🎉 User registered successfully!');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
