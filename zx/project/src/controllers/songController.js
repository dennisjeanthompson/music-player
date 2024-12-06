const Song = require('../models/Song');
const { validateSong } = require('../utils/validation');
const { validateDateRange } = require('../utils/dateUtils');

exports.getAllSongs = (req, res, next) => {
  const { search, dateStart, dateEnd } = req.query;

  if (!validateDateRange(dateStart, dateEnd)) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  if (search || dateStart || dateEnd) {
    Song.search(search, dateStart, dateEnd, (err, songs) => {
      if (err) return next(err);
      
      if (req.headers.accept.includes('application/json')) {
        res.json(songs);
      } else {
        res.render('index', { songs, search, dateStart, dateEnd });
      }
    });
  } else {
    Song.getAll((err, songs) => {
      if (err) return next(err);
      
      if (req.headers.accept.includes('application/json')) {
        res.json(songs);
      } else {
        res.render('index', { songs, search: '', dateStart: '', dateEnd: '' });
      }
    });
  }
};

exports.createSong = (req, res, next) => {
  const song = {
    name: req.body.name,
    description: req.body.description,
    artist: req.body.artist
  };

  const errors = validateSong(song);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  Song.create(song, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.updateSong = (req, res, next) => {
  const { id } = req.params;
  const song = {
    name: req.body.name,
    description: req.body.description,
    artist: req.body.artist
  };

  const errors = validateSong(song);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  Song.update(id, song, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.patchSong = (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  Song.patch(id, updates, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.deleteSong = (req, res, next) => {
  const { id } = req.params;
  
  Song.delete(id, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};