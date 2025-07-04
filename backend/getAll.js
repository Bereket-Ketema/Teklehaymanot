function allPeople(app,db){
    app.get('/api/people', (req, res) => {
  db.query('SELECT * FROM ምዕመናን', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

module.exports={allPeople};