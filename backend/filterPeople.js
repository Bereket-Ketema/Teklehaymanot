function filterPeople(app,db){
    // 🔐 Secure filtering by admin-chosen allowed field and value
app.get('/api/people/filter', (req, res) => {
  const { field, value } = req.query;

  // Whitelist of allowed fields for filtering
  const allowedFields = ['ስም', 'የአባት_ስም', 'የአያት_ስም', 'የእናት_ስም', 'የክርስትና_ስም', 'የባለቤት_ስም', 'ፆታ', 'እድሜ','ንሰሃ_አባት', 'ቀጠና'];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: 'የተፈቀደ መስክ ብቻ ይምረጡ' });
  }

  const sql = `SELECT * FROM ምዕመናን WHERE ?? = ?`;
  db.query(sql, [field, value], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

function countFilteredPeople(app, db) {
  app.get('/api/people/count-filtered', (req, res) => {
    const { field, value } = req.query;

    // Validate field
    const allowedFields = [
      'ስም', 'የአባት_ስም', 'የአያት_ስም', 'የእናት_ስም',
      'የክርስትና_ስም', 'የባለቤት_ስም', 'ፆታ', 'እድሜ',
      'ንሰሃ_አባት', 'ቀጠና', 'ሙያ'
    ];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' });
    }

    const sql = `SELECT COUNT(*) AS total FROM ምዕመናን WHERE \`${field}\` = ?`;
    db.query(sql, [value], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]); // returns { total: ... }
    });
  });
}

function filterChild(app,db){
    // 🔐 Secure filtering by admin-chosen allowed field and value
app.get('/api/children/filter', (req, res) => {
  const { field, value } = req.query;

  // Whitelist of allowed fields for filtering
  const allowedFields = ['ስም', 'የአባት_ስም', 'የአያት_ስም', 'የእናት_ስም', 'የክርስትና_ስም', 'ፆታ', 'እድሜ'];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: 'የተፈቀደ መስክ ብቻ ይምረጡ' });
  }

  const sql = `SELECT * FROM ልጆች WHERE ?? = ?`;
  db.query(sql, [field, value], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
}

module.exports={filterPeople,countFilteredPeople,filterChild};