const express = require('express');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
require('dotenv').config();
const { adminLogin,adminLogout,isAdmin } = require('./backend/admin.js');
const { galleryLogin,galleryLogout,isGalleryUser } = require('./backend/galleryLogin.js');
const { allPeople, countPeople } = require('./backend/getAll.js');
const { registration, registrationor } = require('./backend/registration.js');
const { deletePeople } = require('./backend/deletePeople.js');
const { filterPeople, countFilteredPeople } = require('./backend/filterPeople.js');
const { photoUpload, fetchPhoto, photoDelete } = require('./backend/photos.js');
const { submissionMessage, fetchMessage,deleteMessage } = require('./backend/submition.js');
const { changeAdminPassword, changeGalleryPassword } = require('./backend/changePassword.js');
const { postNews, deleteNews, viewNews } = require('./backend/news.js');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// admin Login route
adminLogin(app);

// 🚪 Gallery login route
galleryLogin(app);

// admin-Logout
adminLogout(app);

// Gallery-logout
galleryLogout(app);


app.use(express.static('public/'));

app.use('/secure', isAdmin, express.static(path.join(__dirname, 'secure')));
// 🧱 Protect the /gallery folder
app.use('/gallery', isGalleryUser, express.static(path.join(__dirname, 'gallery')));
// Serve static files like HTML from "public" folder
app.use('/registration', express.static(path.join(__dirname, 'registration')));
app.use('/suggestion', express.static(path.join(__dirname, 'suggestion')));
app.use('/about', express.static(path.join(__dirname, 'about')));

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

// Multer to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle POST form submission
registration(app,db);

registrationor(app,db);

// Get all people
allPeople(app,db);

//count all people
countPeople(app,db);

//count filtered people
countFilteredPeople(app,db);

// Delete person by ID
deletePeople(app,db);


// 🔐 Secure filtering by admin-chosen allowed field and value
filterPeople(app,db);

//photos
// Upload photo with category
photoUpload(app,db,upload);

// Fetch photos by category (no ID)
fetchPhoto(app,db);

// Delete photo by ID
photoDelete(app,db);

//suggestions

// Handle form submission
submissionMessage(app,db);

// Fetch all suggestions
fetchMessage(app,db);

// Delete suggestion
deleteMessage(app,db);

// Change credentials
changeAdminPassword(app,fs);

// 🔁 Change gallery credentials route
changeGalleryPassword(app,fs);

//posts
// 📰 Insert news
postNews(app,db,upload);

// 🗑️ Delete news
deleteNews(app,db);

// 🌍 Get news for display
viewNews(app,db);

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});