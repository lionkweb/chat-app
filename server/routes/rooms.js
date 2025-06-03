const express = require('express');
const router = express.Router();
const db = require('../db');

// Get chat-rooms
router.get('/', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Post new chat-room.
router.post('/', (req, res) => {
  const { user, room_num } = req.body;
  db.query('INSERT INTO rooms (user, room_number) VALUES (?, ?)', [user, room_num], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});
module.exports = router;

