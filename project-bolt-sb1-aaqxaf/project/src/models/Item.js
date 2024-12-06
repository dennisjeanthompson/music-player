// Database operations for Items
import db from '../db/database.js';

const ItemModel = {
  getAll: () => {
    return db.prepare('SELECT * FROM items ORDER BY date_created DESC').all();
  },

  create: (name, description) => {
    const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
    return stmt.run(name, description);
  },

  update: (id, name, description) => {
    const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
    return stmt.run(name, description, id);
  },

  delete: (id) => {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    return stmt.run(id);
  }
};

export default ItemModel;