function registrationBaptist(app, db) {
  app.post('/baptism', (req, res) => {
    const children = req.body.children;

    if (!Array.isArray(children) || children.length === 0) {
      return res.status(400).send("❌ ምንም መረጃ አልተላከም።");
    }

    const processChild = (index) => {
      if (index >= children.length) {
        return res.send("🎉 መዝግብ በተሳካ ሁኔታ ተከናውኗል!");
      }

      const child = children[index];

      // ✅ check required fields
      const requiredFields = [
        'ስም','የአባት_ስም','የአያት_ስም','የእናት_ስም','የክርስትና_አባት_ስም',
        'የክርስትና_ስም','ፆታ','የትውልድ_ቀን','ክርስትና_የተነሳበት_ቀን','የማስገባት_ቀን','ፊርማ'
      ];

      for (let field of requiredFields) {
        if (!child[field] || child[field].trim() === '') {
          return res.status(400).send(`⚠️ እባክዎ "${field}" ያስገቡ።`);
        }
      }

      // ✅ check if already exists
      const checkSql = `
        SELECT * FROM ክርስትና
        WHERE ስም = ? AND የአባት_ስም = ? AND የክርስትና_አባት_ስም = ?
      `;
      const checkParams = [child['ስም'], child['የአባት_ስም'], child['የክርስትና_አባት_ስም']];

      db.query(checkSql, checkParams, (err, results) => {
        if (err) {
          console.error("❌ ስህተት በመፈተሽ ጊዜ:", err);
          return res.status(500).send("😢 ውስጥ ስህተት ነበር።");
        }

        if (results.length > 0) {
          return res.status(400).send(`⚠️ ይቅርታ፣ "${child['ስም']}" በዚህ አባት "${child['የአባት_ስም']}" ከዚህ በፊት ተመዝግቧል።`);
        }

        // ✅ insert new record
        const insertSql = `
          INSERT INTO ክርስትና (
            ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም, የክርስትና_አባት_ስም,የክርስትና_ስም,ፆታ, የትውልድ_ቀን, ክርስትና_የተነሳበት_ቀን, የማስገባት_ቀን, ፊርማ
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          child['ስም'], child['የአባት_ስም'], child['የአያት_ስም'],
          child['የእናት_ስም'],child['የክርስትና_አባት_ስም'], child['የክርስትና_ስም'], child['ፆታ'],
          child['የትውልድ_ቀን'], child['ክርስትና_የተነሳበት_ቀን'],
          child['የማስገባት_ቀን'], child['ፊርማ']
        ];

        db.query(insertSql, values, (err) => {
          if (err) {
            console.error("❌ ማስገባት ላይ ስህተት:", err);
            return res.status(500).send("😢 መዝግብ ማስገባት አልተሳካም።");
          }
          processChild(index + 1);
        });
      });
    };

    // start recursion
    processChild(0);
  });
}



function registrationBaptistor(app, db) {
  app.post('/baptismor', (req, res) => {
    const member = req.body;

    if (!member || !member['ስም'] || !member['የአባት_ስም']) {
      return res.status(400).send("❌ Odeeffannoo guutuu galchi.");
    }

    const checkSql = `
      SELECT * FROM ክርስትና
      WHERE ስም = ? AND የአባት_ስም = ?
    `;
    const checkParams = [member['ስም'], member['የአባት_ስም']];

    db.query(checkSql, checkParams, (err, results) => {
      if (err) {
        console.error("❌ Rakkoon uumame:", err);
        return res.status(500).send("😢 Rakkoon uumame, irra deebi'ii yaali.");
      }

      if (results.length > 0) {
        return res.status(400).send("⚠️ Dhifama! Galmeen kun duraan ni jiru.");
      }

      const insertSql = `
        INSERT INTO ክርስትና (
          ስም, የአባት_ስም, የአያት_ስም, የእናት_ስም,የክርስትና_አባት_ስም, የክርስትና_ስም,
          ፆታ, የትውልድ_ቀን, ክርስትና_የተነሳበት_ቀን, የማስገባት_ቀን, ፊርማ
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
      const values = [
        member['ስም'], member['የአባት_ስም'], member['የአያት_ስም'],
        member['የእናት_ስም'],member['የክርስትና_አባት_ስም'], member['የክርስትና_ስም'], member['ፆታ'],
        member['የትውልድ_ቀን'], member['ክርስትና_የተነሳበት_ቀን'],
        member['የማስገባት_ቀን'], member['ፊርማ']
      ];

      db.query(insertSql, values, (err, result) => {
        if (err) {
          console.error("❌ Galchu irratti rakkon:", err);
          return res.status(500).send("😢 Galmee hin milkoofne.");
        }
        res.send("🎉 Galmee milkaa'inaan galmeeffame!");
      });
    });
  });
}

function getBaptismMembers(app, db) {
  app.get('/getbaptism', (req, res) => {
    const sql = `
      SELECT id,ስም, የአባት_ስም, የእናት_ስም, የአያት_ስም,የክርስትና_አባት_ስም, የክርስትና_ስም,
             ፆታ, የትውልድ_ቀን, ክርስትና_የተነሳበት_ቀን, የማስገባት_ቀን, ፊርማ
      FROM ክርስትና
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error("❌ በመረጃ ማስመጣት ላይ ስህተት:", err);
        return res.status(500).send("😢 መረጃ ማስመጣት አልተሳካም።");
      }
      res.json(results);
    });
  });
}




module.exports={registrationBaptist,registrationBaptistor,getBaptismMembers};