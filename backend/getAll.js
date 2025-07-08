function allPeople(app,db){
    app.get('/api/people', (req, res) => {
  db.query('SELECT * FROM ምዕመናን', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

// Add this in the same file or another one and import it
function countPeople(app, db) {
  app.get('/api/people/count', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM ምዕመናን', (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]); // returns { total: number }
    });
  });
}


module.exports={allPeople,countPeople};