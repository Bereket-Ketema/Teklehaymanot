Create database ተክልዬ;
use ተክልዬ;

CREATE TABLE ምዕመናን (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ስም VARCHAR(100),
  የአባት_ስም VARCHAR(100),
  የአያት_ስም VARCHAR(100),
  የእናት_ስም VARCHAR(100),
  የክርስትና_ስም VARCHAR(100),
  የባለቤት_ስም VARCHAR(100),
  ልጆች_ብዛት INT,
  ፆታ VARCHAR(10),
  የትውልድ_ቀን VARCHAR(20),
  እድሜ INT,
  ንሰሃ_አሎት VARCHAR(100),
  ንሰሃ_አባት varchar(100),
  የቤት_ቁጥር VARCHAR(50),
  የኖረው_ዘመን INT,
  ቀጠና VARCHAR(50),
  ስልክ_ቁጥር VARCHAR(20),
  ኢሜይል VARCHAR(100),
  የትምህርት_ደረጃ VARCHAR(100),
  ሙያ VARCHAR(100),
  የማስገባት_ቀን VARCHAR(20),
  ፊርማ VARCHAR(100)
);


CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  image LONGBLOB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50),
  image LONGBLOB
);

CREATE TABLE suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);