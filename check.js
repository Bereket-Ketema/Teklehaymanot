const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files like HTML from "public" folder
app.use(express.static('public/'));

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change to your MySQL user
  password: '1394',         // your password here
  database: 'ተክልዬ'   // your DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

// Handle POST form submission
app.post('/register', (req, res) => {
  const { ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም, የባለቤት_ስም,ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,ንሰሃ_አሎት,ንሰሃ_አባት,የቤት_ቁጥር, የኖረው_ዘመን, ቀጠና,ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ, ሙያ, የማስገባት_ቀን, ፊርማ} = req.body;
  const sql = 'INSERT INTO ምዕመናን (ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,የባለቤት_ስም,ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,ንሰሃ_አሎት,ንሰሃ_አባት,የቤት_ቁጥር, የኖረው_ዘመን, ቀጠና,ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ, ሙያ, የማስገባት_ቀን, ፊርማ) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም, የባለቤት_ስም,ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,ንሰሃ_አሎት,ንሰሃ_አባት,የቤት_ቁጥር, የኖረው_ዘመን, ቀጠና,ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ, ሙያ, የማስገባት_ቀን, ፊርማ], (err, result) => {
    if (err) throw err;
    res.send('🎉 User registered successfully!');
    res.redirect('/or');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});