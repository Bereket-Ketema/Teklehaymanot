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

module.exports={filterPeople};