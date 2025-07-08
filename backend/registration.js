function registration(app,db){
    app.post('/register', (req, res) => {
  const {
    ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
    የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
    ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
    ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
    ሙያ, የማስገባት_ቀን, ፊርማ
  } = req.body;

  // Check if person already exists by name, father's name, and phone
  const checkSql = 'SELECT * FROM ምዕመናን WHERE ስም = ? AND የአባት_ስም = ? AND ስልክ_ቁጥር = ?';
  db.query(checkSql, [ስም, የአባት_ስም, ስልክ_ቁጥር], (err, existing) => {
    if (err) return res.status(500).send('😢 ስህተት ተፈጥሯል');

    if (existing.length > 0) {
      return res.send('❌ እነዚህ መረጃዎች አስቀድሞ ተመዝግበዋል።');
    }

    // If not exists, insert the person
    const insertSql = `
      INSERT INTO ምዕመናን (
        ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
        የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
        ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
        ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
        ሙያ, የማስገባት_ቀን, ፊርማ
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
      የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
      ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
      ሙያ, የማስገባት_ቀን, ፊርማ
    ], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("😢 መመዝገብ አልተሳካም።");
      }

      res.send('🎉 ተመዝግቧል በተሳካ ሁኔታ!');
    });
  });
});
}

function registrationor(app,db){
    app.post('/registeror', (req, res) => {
  const {
    ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
    የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
    ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
    ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
    ሙያ, የማስገባት_ቀን, ፊርማ
  } = req.body;

  // Check if person already exists by name, father's name, and phone
  const checkSql = 'SELECT * FROM ምዕመናን WHERE ስም = ? AND የአባት_ስም = ? AND ስልክ_ቁጥር = ?';
  db.query(checkSql, [ስም, የአባት_ስም, ስልክ_ቁጥር], (err, existing) => {
    if (err) return res.status(500).send('😢 ስህተት ተፈጥሯል');

    if (existing.length > 0) {
      return res.send('❌ እነዚህ መረጃዎች አስቀድሞ ተመዝግበዋል።');
    }

    // If not exists, insert the person
    const insertSql = `
      INSERT INTO ምዕመናን (
        ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
        የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
        ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
        ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
        ሙያ, የማስገባት_ቀን, ፊርማ
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
      የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
      ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
      ሙያ, የማስገባት_ቀን, ፊርማ
    ], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("😢 Galmeen hin milkoofne");
      }

      res.send('🎉 Galmeen milkaa’inaan xumurameera!');
    });
  });
});
}


module.exports={registration,registrationor};