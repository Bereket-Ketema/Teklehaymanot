const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql2');
const path = require('path');
const app = express();
const { adminLogin,adminLogout,isAdmin } = require('./backend/admin.js');
const { galleryLogin,galleryLogout,isGalleryUser } = require('./backend/galleryLogin.js');
const { allPeople, countPeople, allChild, countChild, status } = require('./backend/getAll.js');
const { registration, registrationor, registrationChild, registrationChildor } = require('./backend/registration.js');
const { deletePeople, deleteChildren, deleteBaptist } = require('./backend/deletePeople.js');
const { filterPeople, countFilteredPeople, filterChild } = require('./backend/filterPeople.js');
const { photoUpload, fetchPhoto, photoDelete } = require('./backend/photos.js');
const { submissionMessage, fetchMessage,deleteMessage } = require('./backend/submition.js');
const { changeAdminPassword, changeGalleryPassword } = require('./backend/changePassword.js');
const { postNews, deleteNews, viewNews } = require('./backend/news.js');
const { allDeath, countDeath, allBetray, countBetray } = require('./backend/death.js');
const {registrationBaptist, registrationBaptistor, getBaptismMembers} = require('./backend/baptistes.js');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());// for POST requests

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
}));





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



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true, // enforce secure SSL
  }
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
  } else {
    console.log('✅ Connected to TiDB Serverless!');
  }
});

// Multer to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// admin Login route
adminLogin(app,db);

// 🚪 Gallery login route
galleryLogin(app,db);

// Handle POST form submission
registration(app,db);

registrationor(app,db);

registrationChild(app,db);

registrationChildor(app,db);

registrationBaptist(app,db);

registrationBaptistor(app,db);

getBaptismMembers(app,db);

// Get all people
allPeople(app,db);

//get all child
allChild(app,db);

//count all child
countChild(app,db);

//get all death
allDeath(app,db);

//get all betray
allBetray(app,db);

//count all people
countPeople(app,db);

//count betray
countBetray(app,db);

//count death peoples
countDeath(app,db);


//count filtered people
countFilteredPeople(app,db);

// Delete person by ID
deletePeople(app,db);

//delete children by ID
deleteChildren(app,db);

deleteBaptist(app,db);

//update status
status(app,db);


// 🔐 Secure filtering by admin-chosen allowed field and value
filterPeople(app,db);

//sort children
filterChild(app,db);

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
changeAdminPassword(app,db);

// 🔁 Change gallery credentials route
changeGalleryPassword(app,db);

//posts
// 📰 Insert news
postNews(app,db,upload);

// 🗑️ Delete news
deleteNews(app,db);

// 🌍 Get news for display
viewNews(app,db);



app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});