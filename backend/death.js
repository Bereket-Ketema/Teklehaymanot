function allDeath(app,db){
    app.get('/api/death', (req, res) => {
  db.query("SELECT * FROM ምዕመናን WHERE ሁኔታ = 'ሞተ' ", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

function allBetray(app,db){
    app.get('/api/betray', (req, res) => {
  db.query("SELECT * FROM ምዕመናን WHERE ሁኔታ = 'ካደ' ", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

// Add death people count
function countDeath(app, db) {
  app.get('/api/death/count', (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM ምዕመናን WHERE ሁኔታ = 'ሞተ'", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    });
  });
}

function countBetray(app, db) {
  app.get('/api/betray/count', (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM ምዕመናን WHERE ሁኔታ = 'ካደ'", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    });
  });
}

module.exports={allDeath,countDeath,allBetray,countBetray};