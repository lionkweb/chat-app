const { Server } = require('socket.io');
const db = require('./db');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send_message', (data) => {
      // console.log('Received message:', data);
      io.emit('receive_message', data);
      let sender = "choe"; // You can enhance this later
      db.query(
        'INSERT INTO messages (sender, message, roomId) VALUES (?, ?, ?)',
        [sender, data.message, data.roomId],
        (err) => {
          if (err) {
            console.error('DB insert error:', err);
          }
        }
      );
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on('create_room', () => {
      console.log("A new chat room created.");
    })
  });
}

module.exports = initSocket;