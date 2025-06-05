const authMiddleware = require('../middleware/auth');

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get messages
router.get('/:sender/:receiver', (req, res) => {
  const { sender, receiver } = req.params;
  console.log(sender, " - ", receiver);
  db.query('SELECT * FROM messages WHERE sender_id IN (?, ?) AND receiver_id IN (?, ?) AND sender_id != receiver_id;', [sender, receiver, sender, receiver], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Post message
router.post('/', (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  db.query('INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)', [sender_id, receiver_id, message], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});
module.exports = router;

