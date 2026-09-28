const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3030;
const rooms = new Map();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('join_room', ({ username, room }) => {
    socket.join(room);

    if (!rooms.has(room)) {
      rooms.set(room, new Map());
    }

    const roomUsers = rooms.get(room);
    roomUsers.set(socket.id, username);

    socket.data.username = username;
    socket.data.room = room;

    io.to(room).emit('room_users', Array.from(roomUsers.values()));
    socket.emit('welcome_message', `Welcome ${username}! You joined room ${room}.`);
    socket.to(room).emit('system_message', `${username} joined the room.`);
  });

  socket.on('send_message', ({ room, message, username }) => {
    if (!room || !message || !username) return;

    io.to(room).emit('receive_message', {
      username,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('leave_room', () => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (!room) return;

    socket.leave(room);

    const roomUsers = rooms.get(room);
    if (roomUsers) {
      roomUsers.delete(socket.id);
      io.to(room).emit('room_users', Array.from(roomUsers.values()));
      socket.to(room).emit('system_message', `${username} left the room.`);
    }

    if (roomUsers && roomUsers.size === 0) {
      rooms.delete(room);
    }

    socket.data.room = null;
    socket.data.username = null;
  });

  socket.on('disconnect', () => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (!room || !username) return;

    const roomUsers = rooms.get(room);
    if (roomUsers) {
      roomUsers.delete(socket.id);
      io.to(room).emit('room_users', Array.from(roomUsers.values()));
      socket.to(room).emit('system_message', `${username} left the room.`);
    }

    if (roomUsers && roomUsers.size === 0) {
      rooms.delete(room);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Chat app running on http://localhost:${PORT}`);
});
