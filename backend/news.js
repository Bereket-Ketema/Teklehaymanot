function postNews(app,db,upload){
        // 📰 Insert news
    app.post('/news', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file.buffer;

    db.query('INSERT INTO news (title, content, image) VALUES (?, ?, ?)', [title, content, image], (err) => {
        if (err) return res.status(500).send('Error saving news');
        res.send('✅🎉 ተመዝግቧል በተሳካ ሁኔታ!');
    });
    });
}

function deleteNews(app,db){
    app.delete('/news/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM news WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Delete failed');
    res.send('🗑️ Deleted successfully');
  });
});
}

function viewNews(app,db){
    app.get('/news', (req, res) => {
  db.query('SELECT id, title, content, image, created_at FROM news ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send('Failed to fetch');
    const data = results.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      created_at: item.created_at,
      image: 'data:image/jpeg;base64,' + item.image.toString('base64')
    }));
    res.json(data);
  });
});
}

module.exports={postNews,deleteNews,viewNews};