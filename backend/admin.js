function adminLogin(app, db) {
  app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM admin WHERE user = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        req.session.loggedIn = true;
        return res.redirect('/secure/inter.html');
      } else {
        return res.status(401).send('❌ የተሳሳተ መረጃ፣ እባክዎ ደግመው ይሞክሩ።');
      }
    });
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