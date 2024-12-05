const { db } = require('../models/db');

exports.getAllTracks = (req, res) => {
  db.all('SELECT * FROM tracks ORDER BY date_created DESC', [], (err, tracks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render('index', { tracks });
  });
};

exports.createTrack = (req, res) => {
  const { name, artist, description } = req.body;
  const file_path = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO tracks (name, artist, description, file_path) VALUES (?, ?, ?, ?)',
    [name, artist, description, file_path],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect('/');
    }
  );
};

exports.updateTrack = (req, res) => {
  const { name, artist, description } = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE tracks SET name = ?, artist = ?, description = ? WHERE id = ?',
    [name, artist, description, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect('/');
    }
  );
};

exports.deleteTrack = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tracks WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
};