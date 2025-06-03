const authMiddleware = require('../middleware/auth');

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get messages
router.get('/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  db.query('SELECT * FROM messages WHERE sender IN (?, ?) AND receiver IN (?, ?) AND sender != receiver;', ["han", roomId, "han", roomId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Post message
router.post('/', (req, res) => {
  const { user, message } = req.body;
  db.query('INSERT INTO messages (user, message_content) VALUES (?, ?)', [user, message], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});
module.exports = router;

