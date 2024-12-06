import db from '../db/database.js';

const SongModel = {
  getAll: () => {
    return db.prepare('SELECT * FROM songs ORDER BY date_created DESC').all();
  },

  create: (title, artist, url) => {
    const stmt = db.prepare('INSERT INTO songs (title, artist, url) VALUES (?, ?, ?)');
    return stmt.run(title, artist, url);
  },

  update: (id, title, artist, url) => {
    const stmt = db.prepare('UPDATE songs SET title = ?, artist = ?, url = ? WHERE id = ?');
    return stmt.run(title, artist, url, id);
  },

  delete: (id) => {
    const stmt = db.prepare('DELETE FROM songs WHERE id = ?');
    return stmt.run(id);
  }
};

export default SongModel;