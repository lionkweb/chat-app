const express = require('express');
const http = require('http');
const cors = require('cors');
const messageRoutes = require('./routes/messages');
const roomRoutes = require('./routes/rooms');
const userRoutes = require('./routes/users');
const initSocket = require('./socket'); // Import socket setup

const app = express();
app.use(cors());

const server = http.createServer(app);

// Initialize socket with the HTTP server
initSocket(server);

// API routes
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});