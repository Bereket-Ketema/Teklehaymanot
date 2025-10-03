function deletePeople(app,db){
    app.delete('/api/people/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ምዕመናን WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});
}

function deleteBaptist(app,db){
     app.delete('/api/baptist/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ክርስትና WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});
}

function deleteChildren(app,db){
    app.delete('/api/child/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ልጆች WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});
}

module.exports={deletePeople,deleteChildren,deleteBaptist};