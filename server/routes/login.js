const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Validate user (check DB, etc.)

  // On success:
  const user = { id: 123, username };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user });
});