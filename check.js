const express = require('express');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
require('dotenv').config();

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Login route
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.loggedIn = true;
    return res.redirect('/secure/inter.html'); // On success, redirect
  } else {
    // On failure, send error message with status 401 (Unauthorized)
    return res.status(401).send('❌ የተሳሳተ መረጃ፣ እባክዎ ደግመው ይሞክሩ።');
  }
});

// 🚪 Gallery login route
app.post('/gallery-login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.GALLERY_USERNAME &&
    password === process.env.GALLERY_PASSWORD
  ) {
    req.session.galleryLoggedIn = true;
    return res.redirect('/gallery/interg.html'); // or your first gallery page
  } else {
    return res.status(401).send('❌ የተሳሳተ መረጃ፣ እባክዎ ደግመው ይሞክሩ።');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin.html');
  });
});

app.get('/gallery-logout', (req, res) => {
  req.session.galleryLoggedIn = false;
  res.redirect('/adming.html');
});

// 🔐 Middleware to protect gallery folder
function isGalleryUser(req, res, next) {
  if (req.session && req.session.galleryLoggedIn) {
    return next();
  } else {
    return res.redirect('/adming.html');
  }
}

function isAdmin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect('/admin.html');
  }
}

app.use('/secure', isAdmin, express.static(path.join(__dirname, 'secure')));
// 🧱 Protect the /gallery folder
app.use('/gallery', isGalleryUser, express.static(path.join(__dirname, 'gallery')));
// Serve static files like HTML from "public" folder
app.use(express.static('public/'));
app.use('/registration', express.static(path.join(__dirname, 'registration')));
app.use('/suggestion', express.static(path.join(__dirname, 'suggestion')));

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change to your MySQL user
  password: '1394',         // your password here
  database: 'ተክልዬ'   // your DB name
});

// Multer to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

// Handle POST form submission
app.post('/register', (req, res) => {
  const {
    ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
    የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
    ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
    ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
    ሙያ, የማስገባት_ቀን, ፊርማ
  } = req.body;

  // Check if person already exists by name, father's name, and phone
  const checkSql = 'SELECT * FROM ምዕመናን WHERE ስም = ? AND የአባት_ስም = ? AND ስልክ_ቁጥር = ?';
  db.query(checkSql, [ስም, የአባት_ስም, ስልክ_ቁጥር], (err, existing) => {
    if (err) return res.status(500).send('😢 ስህተት ተፈጥሯል');

    if (existing.length > 0) {
      return res.send('❌ እነዚህ መረጃዎች አስቀድሞ ተመዝግበዋል።');
    }

    // If not exists, insert the person
    const insertSql = `
      INSERT INTO ምዕመናን (
        ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
        የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
        ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
        ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
        ሙያ, የማስገባት_ቀን, ፊርማ
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
      የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
      ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
      ሙያ, የማስገባት_ቀን, ፊርማ
    ], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("😢 መመዝገብ አልተሳካም።");
      }

      res.send('🎉 ተመዝግቧል በተሳካ ሁኔታ!');
    });
  });
});

// Get all people
app.get('/api/people', (req, res) => {
  db.query('SELECT * FROM ምዕመናን', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Delete person by ID
app.delete('/api/people/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ምዕመናን WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});


// 🔐 Secure filtering by admin-chosen allowed field and value
app.get('/api/people/filter', (req, res) => {
  const { field, value } = req.query;

  // Whitelist of allowed fields for filtering
  const allowedFields = ['ስም', 'የአባት_ስም', 'የአያት_ስም', 'የእናት_ስም', 'የክርስትና_ስም', 'የባለቤት_ስም', 'ፆታ', 'እድሜ','ንሰሃ_አባት', 'ቀጠና'];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: 'የተፈቀደ መስክ ብቻ ይምረጡ' });
  }

  const sql = `SELECT * FROM ምዕመናን WHERE ?? = ?`;
  db.query(sql, [field, value], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


//photos
// Upload photo with category
app.post('/upload', upload.single('photo'), (req, res) => {
  const { category } = req.body;
  const image = req.file.buffer;
  const sql = 'INSERT INTO photos (category, image) VALUES (?, ?)';
  db.query(sql, [category, image], (err) => {
    if (err) return res.status(500).send('Upload failed');
    res.send('Photo uploaded!');
  });
});

// Fetch photos by category (no ID)
app.get('/photos/:category', (req, res) => {
  const category = req.params.category;
  db.query('SELECT image FROM photos WHERE category = ?', [category], (err, results) => {
    if (err) return res.status(500).send('DB Error');
    const photos = results.map(row =>
      'data:image/jpeg;base64,' + row.image.toString('base64')
    );
    res.json(photos);
  });
});

// Fetch photos with ID (for deletion)
app.get('/photosWithId/:category', (req, res) => {
  const category = req.params.category;
  db.query('SELECT id, image FROM photos WHERE category = ?', [category], (err, results) => {
    if (err) return res.status(500).send('DB Error');
    const photos = results.map(row => ({
      id: row.id,
      image: 'data:image/jpeg;base64,' + row.image.toString('base64')
    }));
    res.json(photos);
  });
});

// Delete photo by ID
app.delete('/delete/:id', (req, res) => {
  const photoId = req.params.id;
  db.query('DELETE FROM photos WHERE id = ?', [photoId], (err) => {
    if (err) return res.status(500).send('Delete failed');
    res.send('Deleted successfully');
  });
});


//suggestions
// Serve the suggestion form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'suggestion.html'));
});

// Handle form submission
app.post('/submit-suggestion', (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).send('እባክዎ ሀሳቡን ያስገቡ።');
  }

  const query = 'INSERT INTO suggestions (message) VALUES (?)';

  db.query(query, [message], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('ሀሳቡን ማስቀመጥ አልተቻለም።');
    }
    res.send('አመሰግናለሁ፣ ሀሳብዎ ተቀባ!');
  });
});

//fetch the suggestions
// 🔁 Updated route to serve the renamed suggest.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'secure', 'suggest.html'));
});


// Fetch all suggestions
app.get('/admin/suggestions', (req, res) => {
  db.query('SELECT * FROM suggestions ORDER BY submitted_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// Delete suggestion
app.delete('/admin/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM suggestions WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Failed to delete');
    res.send('Deleted');
  });
});

// Change credentials
app.post('/change-credentials', isAdmin, (req, res) => {
  const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

  if (
    currentUsername === process.env.ADMIN_USERNAME &&
    currentPassword === process.env.ADMIN_PASSWORD
  ) {
    const envContent = `ADMIN_USERNAME=${newUsername}\nADMIN_PASSWORD=${newPassword}`;
    fs.writeFileSync('.env', envContent);
    res.send('✅ መረጃው ተቀይሯል፣ እባክዎ አገልግሎቱን ዳግመኛ ያስጀምሩ');
  } else {
    res.send('❌ የአሁኑ መረጃዎች ትክክል አይደሉም');
  }
});

// 🔁 Change gallery credentials route
app.post('/change-gallery', (req, res) => {
  const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

  if (
    currentUsername === process.env.GALLERY_USERNAME &&
    currentPassword === process.env.GALLERY_PASSWORD
  ) {
    // Load current .env content
    fs.readFile('.env', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading .env:', err);
        return res.status(500).send('Server error');
      }

      // Replace the existing credentials
      const updatedEnv = data
        .replace(/GALLERY_USERNAME=.*/g, `GALLERY_USERNAME=${newUsername}`)
        .replace(/GALLERY_PASSWORD=.*/g, `GALLERY_PASSWORD=${newPassword}`);

      // Save updated .env
      fs.writeFile('.env', updatedEnv, (err) => {
        if (err) {
          console.error('Error writing to .env:', err);
          return res.status(500).send('Update failed');
        }

        // Refresh the current env variables in memory (optional)
        process.env.GALLERY_USERNAME = newUsername;
        process.env.GALLERY_PASSWORD = newPassword;

        res.send('✅ መረጃው ተቀይሯል፣ እባክዎ አገልግሎቱን ዳግመኛ ያስጀምሩ');
      });
    });
  } else {
    res.send('❌ ያስገቡት አስቀድሞ ያለው መረጃ የተሳሳተ ነው።');
  }
});

//posts
// 📰 Insert news
app.post('/news', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const image = req.file.buffer;

  db.query('INSERT INTO news (title, content, image) VALUES (?, ?, ?)', [title, content, image], (err) => {
    if (err) return res.status(500).send('Error saving news');
    res.send('✅🎉 ተመዝግቧል በተሳካ ሁኔታ!');
  });
});

// 🗑️ Delete news
app.delete('/news/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM news WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Delete failed');
    res.send('🗑️ Deleted successfully');
  });
});

// 🌍 Get news for display
app.get('/news', (req, res) => {
  db.query('SELECT id, title, content, image, created_at FROM news ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send('Failed to fetch');
    const data = results.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      created_at: item.created_at,
      image: 'data:image/jpeg;base64,' + item.image.toString('base64')
    }));
    res.json(data);
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});