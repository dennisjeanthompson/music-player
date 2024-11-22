import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import * as songController from '../controllers/songController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', songController.index);
router.get('/songs/search', songController.search);
router.get('/songs/:id', songController.show);
router.post('/songs', upload.single('audio'), songController.create);
router.put('/songs/:id', songController.update);
router.delete('/songs/:id', songController.remove);

export default router;