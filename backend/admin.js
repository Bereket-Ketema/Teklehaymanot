function adminLogin(app){
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
}

function adminLogout(app){
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/admin.html');
    });
  });
}

// 🔐 Middleware to protect gallery folder
function isAdmin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect('/admin.html');
  }
}

module.exports = { adminLogin,adminLogout,isAdmin };