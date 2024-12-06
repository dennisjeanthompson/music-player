import express from 'express';
import ItemModel from '../models/Item.js';

const router = express.Router();

// Get all items
router.get('/items', (req, res) => {
  try {
    const items = ItemModel.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Create new item
router.post('/items', (req, res) => {
  try {
    const { name, description } = req.body;
    const result = ItemModel.create(name, description);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Update item
router.put('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    ItemModel.update(id, name, description);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item
router.delete('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    ItemModel.delete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;