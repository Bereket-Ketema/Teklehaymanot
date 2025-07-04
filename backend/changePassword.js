const {isAdmin } = require('./admin.js');
function changeAdminPassword(app,fs){
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
}

function changeGalleryPassword(app,fs){
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
}

module.exports={changeAdminPassword,changeGalleryPassword}