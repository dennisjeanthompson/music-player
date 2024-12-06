const Song = require('../models/Song');

exports.getAllSongs = (req, res) => {
  const { search, dateStart, dateEnd } = req.query;

  if (search || dateStart || dateEnd) {
    Song.search(search, dateStart, dateEnd, (err, songs) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (req.headers.accept.includes('application/json')) {
        res.json(songs);
      } else {
        res.render('index', { songs, search, dateStart, dateEnd });
      }
    });
  } else {
    Song.getAll((err, songs) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (req.headers.accept.includes('application/json')) {
        res.json(songs);
      } else {
        res.render('index', { songs, search: '', dateStart: '', dateEnd: '' });
      }
    });
  }
};

exports.createSong = (req, res) => {
  const { name, description, artist } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  Song.create({ name, description, artist }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
};

exports.updateSong = (req, res) => {
  const { id } = req.params;
  const { name, description, artist } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  Song.update(id, { name, description, artist }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
};

exports.patchSong = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  Song.patch(id, updates, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
};

exports.deleteSong = (req, res) => {
  const { id } = req.params;
  
  Song.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
};