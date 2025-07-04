function galleryLogin(app){
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