function allPeople(app,db){
    app.get('/api/people', (req, res) => {
  db.query("SELECT * FROM ምዕመናን WHERE ሁኔታ = 'በቤተክርስቲያን ውስጥ' ", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}


// Add this in the same file or another one and import it
function countPeople(app, db) {
  app.get('/api/people/count', (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM ምዕመናን WHERE ሁኔታ = 'በቤተክርስቲያን ውስጥ'", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    });
  });
}


function status(app, db) {
  app.put('/api/people/status/:id', (req, res) => {
    let { status } = req.body;
    const { id } = req.params;

    // Map "ተመለሰ" to "በቤተክርስቲያን ውስጥ"
    if (status === 'ተመለሰ') {
      status = 'በቤተክርስቲያን ውስጥ';
    }

    const validStatus = ['በቤተክርስቲያን ውስጥ', 'ሞተ', 'ካደ'];

    if (!validStatus.includes(status)) {
      return res.status(400).send('አልተፈቀደም ያለ ሁኔታ');
    }

    db.query("UPDATE ምዕመናን SET ሁኔታ = ? WHERE id = ?", [status, id], (err) => {
      if (err) return res.status(500).send('ማስተካከል አልተሳካም');
      res.send('ሁኔታ ተቀይሯል።');
    });
  });
}


function allChild(app,db){
    app.get('/api/child', (req, res) => {
  db.query('SELECT * FROM ልጆች', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

// Add this in the same file or another one and import it
function countChild(app, db) {
  app.get('/api/child/count', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM ልጆች', (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]); // returns { total: number }
    });
  });
}


module.exports={allPeople,countPeople,allChild,countChild,status};