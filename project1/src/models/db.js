const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../data/music.db');
const db = new sqlite3.Database(dbPath);

function init() {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      artist VARCHAR(255),
      description TEXT,
      file_path TEXT,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  db,
  init
};