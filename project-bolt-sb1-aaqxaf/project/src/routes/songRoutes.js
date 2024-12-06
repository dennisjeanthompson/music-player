import express from 'express';
import SongModel from '../models/Song.js';

const router = express.Router();

router.get('/songs', (req, res) => {
  try {
    const songs = SongModel.getAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

router.post('/songs', (req, res) => {
  try {
    const { title, artist, url } = req.body;
    const result = SongModel.create(title, artist, url);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create song' });
  }
});

router.put('/songs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, url } = req.body;
    SongModel.update(id, title, artist, url);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update song' });
  }
});

router.delete('/songs/:id', (req, res) => {
  try {
    const { id } = req.params;
    SongModel.delete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete song' });
  }
});

export default router;