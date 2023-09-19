// socket.js
const socketIo = require('socket.io');
const { saveMessageToDB } = require('../controllers/socket/index'); // Import your database-related functions

function initializeSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
      // Broadcast the message to all connected clients
      io.emit('message', data);

      // Optionally, save the message to a database
      saveMessageToDB(data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

module.exports = initializeSocket;
