const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const trackController = require('../controllers/trackController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', trackController.getAllTracks);
router.post('/tracks', upload.single('audio'), trackController.createTrack);
router.put('/tracks/:id', trackController.updateTrack);
router.delete('/tracks/:id', trackController.deleteTrack);

module.exports = router;