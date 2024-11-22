import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../music.db');
const db = new sqlite3.Database(dbPath);

export function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      album VARCHAR(255),
      file_path VARCHAR(255) NOT NULL,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  });
}

export function getAllSongs() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM songs ORDER BY date_created DESC', (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

export function getSongById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM songs WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

export function createSong(song) {
  return new Promise((resolve, reject) => {
    const { name, artist, album, file_path } = song;
    db.run(
      'INSERT INTO songs (name, artist, album, file_path) VALUES (?, ?, ?, ?)',
      [name, artist, album, file_path],
      function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
}

export function updateSong(id, song) {
  return new Promise((resolve, reject) => {
    const { name, artist, album } = song;
    db.run(
      'UPDATE songs SET name = ?, artist = ?, album = ? WHERE id = ?',
      [name, artist, album, id],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}

export function deleteSong(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM songs WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

export function searchSongs(query) {
  return new Promise((resolve, reject) => {
    const searchQuery = `%${query}%`;
    db.all(
      'SELECT * FROM songs WHERE name LIKE ? OR artist LIKE ? OR album LIKE ?',
      [searchQuery, searchQuery, searchQuery],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
}

export default db;