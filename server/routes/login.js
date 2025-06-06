const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;


  db.query('SELECT * FROM users WHERE name = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(409).json({ message: 'User does not exists' });
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);

    const user = results[0];
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password); 
    console.log("isMatch = ", isMatch);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });
    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, user});
  });
});

module.exports = router;