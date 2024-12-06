const db = require('../config/database');

class Song {
  static getAll(callback) {
    db.all('SELECT * FROM songs ORDER BY date_created DESC', callback);
  }

  static search(query, dateStart, dateEnd, callback) {
    let sql = 'SELECT * FROM songs WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (name LIKE ? OR artist LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    if (dateStart) {
      sql += ' AND date_created >= ?';
      params.push(dateStart);
    }

    if (dateEnd) {
      sql += ' AND date_created <= ?';
      params.push(dateEnd);
    }

    sql += ' ORDER BY date_created DESC';
    db.all(sql, params, callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM songs WHERE id = ?', [id], callback);
  }

  static create(song, callback) {
    const { name, description, artist } = song;
    db.run(
      'INSERT INTO songs (name, description, artist) VALUES (?, ?, ?)',
      [name, description, artist],
      callback
    );
  }

  static update(id, song, callback) {
    const { name, description, artist } = song;
    db.run(
      'UPDATE songs SET name = ?, description = ?, artist = ? WHERE id = ?',
      [name, description, artist, id],
      callback
    );
  }

  static patch(id, updates, callback) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    db.run(`UPDATE songs SET ${fields} WHERE id = ?`, values, callback);
  }

  static delete(id, callback) {
    db.run('DELETE FROM songs WHERE id = ?', [id], callback);
  }
}

module.exports = Song;