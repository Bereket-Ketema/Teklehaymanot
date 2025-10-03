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
        ሙያ, የማስገባት_ቀን, ፊርማ,ሁኔታ
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const ሁኔታ = 'በቤተክርስቲያን ውስጥ';

    db.query(insertSql, [
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
      የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
      ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
      ሙያ, የማስገባት_ቀን, ፊርማ,ሁኔታ
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
        ሙያ, የማስገባት_ቀን, ፊርማ,ሁኔታ
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const ሁኔታ = 'በቤተክርስቲያን ውስጥ';

    db.query(insertSql, [
      ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
      የባለቤት_ስም, ልጆች_ብዛት, ፆታ, የትውልድ_ቀን, እድሜ,
      ንሰሃ_አሎት, ንሰሃ_አባት, የቤት_ቁጥር, የኖረው_ዘመን,
      ቀጠና, ስልክ_ቁጥር, ኢሜይል, የትምህርት_ደረጃ,
      ሙያ, የማስገባት_ቀን, ፊርማ,ሁኔታ,
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

function registrationChild(app,db){
  app.post('/child', (req, res) => {
  const children = req.body.children;

  if (!Array.isArray(children) || children.length === 0) {
    return res.status(400).send("❌ ምንም መረጃ አልተላከም።");
  }

  const inserted = [];
  const skipped = [];

  // Loop through each child
  const processChild = (index) => {
    if (index >= children.length) {
      return res.send(
        `✅ ${inserted.length} ልጆች ተመዝግበዋል።\n❌ ${skipped.length} ድጋሚ መረጃ ምክንያት ምክንያት አልተመዘገቡም።`
      );
    }

    const child = children[index];
    const checkSql = `
      SELECT * FROM ልጆች
      WHERE ስም = ? AND የአባት_ስም = ? AND ስልክ_ቁጥር = ?
    `;
    const checkParams = [
      child['ስም'],
      child['የአባት_ስም'],
      child['ስልክ_ቁጥር'],
    ];

    db.query(checkSql, checkParams, (err, results) => {
      if (err) {
        console.error("❌ ስህተት በመፈተሽ ጊዜ:", err);
        return res.status(500).send("😢 ውስጥ ስህተት ነበር።");
      }

      if (results.length > 0) {
        skipped.push(child);
        processChild(index + 1); // Move to next
      } else {
        const insertSql = `
          INSERT INTO ልጆች (
            ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
            ፆታ, የትውልድ_ቀን, እድሜ,
            ስልክ_ቁጥር, የማስገባት_ቀን, ፊርማ
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          child['ስም'], child['የአባት_ስም'], child['የአያት_ስም'],
          child['የእናት_ስም'], child['የክርስትና_ስም'], child['ፆታ'],
          child['የትውልድ_ቀን'], child['እድሜ'], child['ስልክ_ቁጥር'],
          child['የማስገባት_ቀን'], child['ፊርማ']
        ];

        db.query(insertSql, values, (err, result) => {
          if (err) {
            console.error("❌ ማስገባት ላይ ስህተት:", err);
            skipped.push(child); // Treat as failed
          } else {
            inserted.push(child);
          }
          processChild(index + 1); // Continue
        });
      }
    });
  };

  // Start processing
  processChild(0);
});

}



function registrationChildor(app,db){
  app.post('/childor', (req, res) => {
  const children = req.body.children;

  if (!Array.isArray(children) || children.length === 0) {
    return res.status(400).send("❌ Galmeen hin ergamne።");
  }

  const inserted = [];
  const skipped = [];

  // Loop through each child
  const processChild = (index) => {
    if (index >= children.length) {
      return res.send(
        `✅ Ijollen ${inserted.length} Galmaa'aan።\n❌ ${skipped.length} Sababa Galme irra debi'itin hin galmoofne።`
      );
    }

    const child = children[index];
    const checkSql = `
      SELECT * FROM ልጆች
      WHERE ስም = ? AND የአባት_ስም = ? AND ስልክ_ቁጥር = ?
    `;
    const checkParams = [
      child['ስም'],
      child['የአባት_ስም'],
      child['ስልክ_ቁጥር'],
    ];

    db.query(checkSql, checkParams, (err, results) => {
      if (err) {
        console.error("❌ ስህተት በመፈተሽ ጊዜ:", err);
        return res.status(500).send("😢 ውስጥ ስህተት ነበር።");
      }

      if (results.length > 0) {
        skipped.push(child);
        processChild(index + 1); // Move to next
      } else {
        const insertSql = `
          INSERT INTO ልጆች (
            ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_ስም,
            ፆታ, የትውልድ_ቀን, እድሜ,
            ስልክ_ቁጥር, የማስገባት_ቀን, ፊርማ
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          child['ስም'], child['የአባት_ስም'], child['የአያት_ስም'],
          child['የእናት_ስም'], child['የክርስትና_ስም'], child['ፆታ'],
          child['የትውልድ_ቀን'], child['እድሜ'], child['ስልክ_ቁጥር'],
          child['የማስገባት_ቀን'], child['ፊርማ']
        ];

        db.query(insertSql, values, (err, result) => {
          if (err) {
            console.error("❌ Galchu irratti rakkon umameraa:", err);
            skipped.push(child); // Treat as failed
          } else {
            inserted.push(child);
          }
          processChild(index + 1); // Continue
        });
      }
    });
  };

  // Start processing
  processChild(0);
});

}


module.exports={registration,registrationor,registrationChild,registrationChildor};