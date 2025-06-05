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
      io.emit('receive_message', data);
      db.query(
        'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
        [data.sender_id, data.receiver_id, data.message],
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