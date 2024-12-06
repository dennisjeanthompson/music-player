const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/', songController.getAllSongs);
router.post('/songs', songController.createSong);
router.put('/songs/:id', songController.updateSong);
router.patch('/songs/:id', songController.patchSong);
router.delete('/songs/:id', songController.deleteSong);

module.exports = router;