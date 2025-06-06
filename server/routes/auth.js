const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
	console.log(req.body);
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(409).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, password) VALUES (?, ?)',
      [username, hashed],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Insert failed' });

        const token = jwt.sign(
          { id: result.insertId, username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: { id: result.insertId, username } });
      }
    );
  });
});

module.exports = router;