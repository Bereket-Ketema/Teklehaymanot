function photoUpload(app,db,upload){
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
}

function fetchPhoto(app,db){
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
}

function photoDelete(app,db){
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
    if (err) return res.status(500).send('ማጥፋት አልተሳካም');
    res.send('🗑️በተሳካ ሁኔታ ተሰርዟል');
  });
});
}

module.exports={photoUpload,fetchPhoto,photoDelete};