const {isAdmin } = require('./admin.js');
function changeAdminPassword(app, db) {
  app.post('/change-credentials', isAdmin, (req, res) => {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

    // Check current credentials
    const sql = `SELECT * FROM admin WHERE user = ? AND password = ?`;
    db.query(sql, [currentUsername, currentPassword], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("🚨 Internal Server Error");
      }

      if (results.length === 0) {
        return res.send('❌ የአሁኑ መረጃዎች ትክክል አይደሉም');
      }

      // Update with new credentials
      const query = `UPDATE admin SET user = ?, password = ? WHERE user = ? AND password = ?`;
      db.query(query, [newUsername, newPassword, currentUsername, currentPassword], (err, result) => {
        if (err) {
          console.error("Update Error:", err);
          return res.status(500).send("🚨 Failed to update credentials");
        }

        // Destroy session to force re-login
        req.session.destroy(() => {
          res.send('✅ መረጃው ተቀይሯል፣ እባክዎ እንደገና ይግቡ');
        });
      });
    });
  });
}


function changeGalleryPassword(app,db){
  app.post('/change-gallery', (req, res) => {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

    // Check current credentials
    const sql = `SELECT * FROM gallery_admin WHERE user = ? AND password = ?`;
    db.query(sql, [currentUsername, currentPassword], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("🚨 Internal Server Error");
      }

      if (results.length === 0) {
        return res.send('❌ የአሁኑ መረጃዎች ትክክል አይደሉም');
      }

      // Update with new credentials
      const query = `UPDATE gallery_admin SET user = ?, password = ? WHERE user = ? AND password = ?`;
      db.query(query, [newUsername, newPassword, currentUsername, currentPassword], (err, result) => {
        if (err) {
          console.error("Update Error:", err);
          return res.status(500).send("🚨 Failed to update credentials");
        }

        // Destroy session to force re-login
        req.session.destroy(() => {
          res.send('✅ መረጃው ተቀይሯል፣ እባክዎ እንደገና ይግቡ');
        });
      });
    });
  });
}


// function changeGalleryPassword(app,fs){
//     app.post('/change-gallery', (req, res) => {
//   const { currentUsername, currentPassword, newUsername, newPassword } = req.body;

//   if (
//     currentUsername === process.env.GALLERY_ADMIN_USERNAME &&
//     currentPassword === process.env.GALLERY_ADMIN_PASSWORD
//   ) {
//     // Load current .env content
//     fs.readFile('.env', 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading .env:', err);
//         return res.status(500).send('Server error');
//       }

//       // Replace the existing credentials
//       const updatedEnv = data
//         .replace(/GALLERY_ADMIN_USERNAME=.*/g, `GALLERY_ADMIN_USERNAME=${newUsername}`)
//         .replace(/GALLERY_ADMIN_PASSWORD=.*/g, `GALLERY_ADMIN_PASSWORD=${newPassword}`);

//       // Save updated .env
//       fs.writeFile('.env', updatedEnv, (err) => {
//         if (err) {
//           console.error('Error writing to .env:', err);
//           return res.status(500).send('Update failed');
//         }

//         // Refresh the current env variables in memory (optional)
//         process.env.GALLERY_ADMIN_USERNAME = newUsername;
//         process.env.GALLERY_ADMIN_PASSWORD = newPassword;

//         res.send('✅ መረጃው ተቀይሯል፣ እባክዎ አገልግሎቱን ዳግመኛ ያስጀምሩ');
//       });
//     });
//   } else {
//     res.send('❌ ያስገቡት አስቀድሞ ያለው መረጃ የተሳሳተ ነው።');
//   }
// });
// }

module.exports={changeAdminPassword,changeGalleryPassword}