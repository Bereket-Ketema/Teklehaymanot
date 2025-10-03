function galleryLogin(app, db) {
  app.post('/gallery-login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM gallery_admin WHERE user = ? AND password = ?`;

    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        req.session.galleryLoggedIn = true;
        return res.redirect('/gallery/interg.html');
      } else {
        return res.status(401).send('❌ የተሳሳተ መረጃ፣ እባክዎ ደግመው ይሞክሩ።');
      }
    });
  });
}


function galleryLogout(app){
    app.get('/gallery-logout', (req, res) => {
  req.session.galleryLoggedIn = false;
  res.redirect('/adming.html');
});
}

// 🔐 Middleware to protect gallery folder
function isGalleryUser(req, res, next) {
  if (req.session && req.session.galleryLoggedIn) {
    return next();
  } else {
    return res.redirect('/adming.html');
  }
}

module.exports = { galleryLogin,galleryLogout,isGalleryUser };