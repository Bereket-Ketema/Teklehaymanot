function submissionMessage(app,db){
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
}

function fetchMessage(app,db){
    app.get('/admin/suggestions', (req, res) => {
  db.query('SELECT * FROM suggestions ORDER BY submitted_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});
}

function deleteMessage(app,db){
    app.delete('/admin/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM suggestions WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Failed to delete');
    res.send('Deleted');
  });
});
}

module.exports={submissionMessage,deleteMessage,fetchMessage};