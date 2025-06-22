const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const app = express();

// Static files
app.use(express.static('public'));

// Set up multer storage (for photo upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage: storage });

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1394', // Change if needed
  database: 'ተክልዬ',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});

// Body parser for non-multipart forms (not used here, but can be helpful)
app.use(express.urlencoded({ extended: true }));

// Route
app.post('/register', upload.single('ፎቶ'), (req, res) => {
  const form = req.body;

  // Make sure to console.log(form) and req.file to debug
  console.log('Received Form:', form);
  console.log('Uploaded File:', req.file);

  const data = [
    form['ስም'], form['የአባት_ስም'], form['የአያት_ስም'],
    form['የእናት_ስም'], form['የክርስትና_ስም'], form['የባለቤት_ስም'],
    form['ልጆች_ብዛት'], form['ፆታ'], form['የትውልድ_ቀን'],
    form['እድሜ'], req.file ? req.file.filename : null,
    form['ንሰሃ_አሎት'], form['ንሰሃ_አባት'],
    form['የቤት_ቁጥር'], form['የኖረው_ዘመን'], form['ቀጠና'],
    form['ስልክ_ቁጥር'], form['ኢሜይል'],
    form['የትምህርት_ደረጃ'], form['ሙያ'],
    form['እርግጠኝነት'] ? 'ተረጋጋሁ' : 'አልተረጋገጥም',
    form['የማስገባት_ቀን'], form['ፊርማ']
  ];

  const query = `INSERT INTO ምዕመናን (
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም, የባለቤት_ስም,
      ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አባት,
      የቤት_ቁጥር, የኖረው_ዘመን, ቀጠና,
      ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ, ሙያ,
      እርግጠኝነት, የማስገባት_ቀን, ፊርማ
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, data, (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      res.status(500).send('መዝግብ አልተሳካም።');
    } else {
      res.send('መረጃዎ በትክክል ተመዝግቧል!');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
