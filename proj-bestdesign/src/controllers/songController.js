import { getAllSongs, getSongById, createSong, updateSong, deleteSong, searchSongs } from '../models/db.js';

export async function index(req, res) {
  try {
    const songs = await getAllSongs();
    res.render('index', { songs });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function show(req, res) {
  try {
    const song = await getSongById(req.params.id);
    if (!song) return res.status(404).send('Song not found');
    res.render('show', { song });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function create(req, res) {
  try {
    const song = {
      name: req.body.name,
      artist: req.body.artist,
      album: req.body.album,
      file_path: req.file.path
    };
    await createSong(song);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function update(req, res) {
  try {
    await updateSong(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function remove(req, res) {
  try {
    await deleteSong(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function search(req, res) {
  try {
    const songs = await searchSongs(req.query.q);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}