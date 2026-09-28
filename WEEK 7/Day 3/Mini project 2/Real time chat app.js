const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3030;
const roomUsers = new Map();

app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Real-Time Chat</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a, #1d4ed8);
            color: #e2e8f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .app {
            width: min(900px, 95vw);
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          }
          .top {
            background: rgba(255,255,255,0.04);
            padding: 18px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .controls {
            padding: 16px 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          input, select, button {
            padding: 12px 14px;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
          }
          input, select {
            background: #e2e8f0;
            color: #0f172a;
          }
          button {
            background: #ef4444;
            color: white;
            cursor: pointer;
          }
          .layout {
            display: grid;
            grid-template-columns: 220px 1fr;
            min-height: 500px;
          }
          .sidebar {
            background: rgba(15, 23, 42, 0.95);
            border-right: 1px solid rgba(255,255,255,0.08);
            padding: 18px 16px;
          }
          .main {
            display: flex;
            flex-direction: column;
          }
          #messages {
            flex: 1;
            padding: 18px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .message {
            max-width: 75%;
            padding: 10px 12px;
            border-radius: 12px;
            background: rgba(255,255,255,0.07);
            line-height: 1.4;
          }
          .message.self {
            align-self: flex-end;
            background: #2563eb;
          }
          .message.system {
            align-self: center;
            background: rgba(239,68,68,0.35);
            font-size: 0.9rem;
          }
          .message small {
            display: block;
            opacity: 0.8;
            margin-bottom: 5px;
          }
          .composer {
            display: flex;
            gap: 10px;
            padding: 16px 18px;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
          #messageInput { flex: 1; }
          .hidden { display: none; }
          @media (max-width: 700px) {
            .layout { grid-template-columns: 1fr; }
            .sidebar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          }
        </style>
      </head>
      <body>
        <div class="app">
          <div class="top">
            <h1>Real-Time Chat</h1>
          </div>

          <div class="controls">
            <input id="usernameInput" type="text" placeholder="Your name" maxlength="20" />
            <select id="roomSelect">
              <option value="general">General</option>
              <option value="javascript">JavaScript</option>
              <option value="design">Design</option>
            </select>
            <button id="joinBtn">Join Room</button>
            <button id="leaveBtn" class="hidden">Leave Room</button>
          </div>

          <div class="layout">
            <aside class="sidebar">
              <h3>Active Users</h3>
              <ul id="usersList"></ul>
            </aside>

            <main class="main">
              <div id="messages"></div>
              <div class="composer">
                <input id="messageInput" type="text" placeholder="Type your message..." maxlength="300" />
                <button id="sendBtn">Send</button>
              </div>
            </main>
          </div>
        </div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();
          const usernameInput = document.getElementById('usernameInput');
          const roomSelect = document.getElementById('roomSelect');
          const joinBtn = document.getElementById('joinBtn');
          const leaveBtn = document.getElementById('leaveBtn');
          const messageInput = document.getElementById('messageInput');
          const sendBtn = document.getElementById('sendBtn');
          const messages = document.getElementById('messages');
          const usersList = document.getElementById('usersList');

          let currentUser = '';
          let currentRoom = null;

          function appendMessage(text, sender, isSelf, isSystem) {
            const item = document.createElement('div');
            item.className = 'message ' + (isSelf ? 'self' : '') + ' ' + (isSystem ? 'system' : '');

            if (!isSystem) {
              const meta = document.createElement('small');
              meta.textContent = sender;
              item.appendChild(meta);
            }

            const body = document.createElement('div');
            body.textContent = text;
            item.appendChild(body);
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
          }

          function renderUsers(users) {
            usersList.innerHTML = '';
            users.forEach((user) => {
              const item = document.createElement('li');
              item.textContent = user;
              usersList.appendChild(item);
            });
          }

          function joinRoom() {
            const username = usernameInput.value.trim();
            const room = roomSelect.value;

            if (!username) {
              alert('Please enter a username first.');
              return;
            }

            if (currentRoom) {
              socket.emit('leave_room');
            }

            currentUser = username;
            currentRoom = room;
            socket.emit('join_room', { username, room });

            joinBtn.classList.add('hidden');
            leaveBtn.classList.remove('hidden');
            messageInput.focus();
          }

          function leaveRoom() {
            if (!currentRoom) return;
            socket.emit('leave_room');
            currentRoom = null;
            currentUser = '';
            joinBtn.classList.remove('hidden');
            leaveBtn.classList.add('hidden');
            messages.innerHTML = '';
            renderUsers([]);
          }

          joinBtn.addEventListener('click', joinRoom);
          leaveBtn.addEventListener('click', leaveRoom);

          sendBtn.addEventListener('click', () => {
            const text = messageInput.value.trim();
            if (!text || !currentRoom) return;

            socket.emit('send_message', {
              room: currentRoom,
              username: currentUser,
              message: text
            });
            messageInput.value = '';
          });

          messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') sendBtn.click();
          });

          socket.on('welcome_message', (msg) => appendMessage(msg, '', false, true));
          socket.on('system_message', (msg) => appendMessage(msg, '', false, true));
          socket.on('room_users', (users) => renderUsers(users));
          socket.on('receive_message', ({ username, message, time }) => {
            const isSelf = username === currentUser;
            appendMessage(message, username + ' • ' + time, isSelf, false);
          });
        </script>
      </body>
    </html>
  `;

  res.send(html);
});

io.on('connection', (socket) => {
  socket.on('join_room', ({ username, room }) => {
    socket.join(room);

    if (!roomUsers.has(room)) {
      roomUsers.set(room, new Map());
    }

    const roomMap = roomUsers.get(room);
    roomMap.set(socket.id, username);

    socket.data.username = username;
    socket.data.room = room;

    io.to(room).emit('room_users', Array.from(roomMap.values()));
    socket.emit('welcome_message', 'Welcome ' + username + '! You joined room ' + room + '.');
    socket.to(room).emit('system_message', username + ' joined the room.');
  });

  socket.on('send_message', ({ room, username, message }) => {
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

    const roomMap = roomUsers.get(room);
    if (roomMap) {
      roomMap.delete(socket.id);
      io.to(room).emit('room_users', Array.from(roomMap.values()));
      socket.to(room).emit('system_message', username + ' left the room.');
    }

    if (roomMap && roomMap.size === 0) {
      roomUsers.delete(room);
    }

    socket.data.room = null;
    socket.data.username = null;
  });

  socket.on('disconnect', () => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (!room || !username) return;

    const roomMap = roomUsers.get(room);
    if (roomMap) {
      roomMap.delete(socket.id);
      io.to(room).emit('room_users', Array.from(roomMap.values()));
      socket.to(room).emit('system_message', username + ' left the room.');
    }

    if (roomMap && roomMap.size === 0) {
      roomUsers.delete(room);
    }
  });
});

server.listen(PORT, () => {
  console.log('Chat app running on http://localhost:' + PORT);
});
