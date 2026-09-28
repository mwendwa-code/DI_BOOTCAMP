const express = require('express');
const app = express();

const PORT = 3050;
const BOARD_SIZE = 10;
const obstacles = [
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 6 },
  { x: 4, y: 4 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 6, y: 2 },
  { x: 6, y: 3 },
  { x: 7, y: 7 },
  { x: 3, y: 7 },
  { x: 8, y: 4 },
  { x: 8, y: 5 }
];

const users = [];
const games = new Map();

app.use(express.json());

function buildBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  obstacles.forEach(({ x, y }) => {
    board[y][x] = 'obstacle';
  });
  return board;
}

function isInsideBoard(x, y) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}

function isObstacle(x, y) {
  return obstacles.some((cell) => cell.x === x && cell.y === y);
}

function isAdjacentToBase(x, y, base) {
  return Math.abs(x - base.x) + Math.abs(y - base.y) === 1;
}

function getUser(username) {
  return users.find((user) => user.username.toLowerCase() === username.toLowerCase());
}

function createGameId() {
  return 'game-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function createGame(player1Name, player2Name) {
  const player1 = {
    name: player1Name,
    base: { x: 0, y: 0 },
    position: { x: 0, y: 0 }
  };

  const player2 = {
    name: player2Name,
    base: { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 },
    position: { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 }
  };

  const game = {
    id: createGameId(),
    boardSize: BOARD_SIZE,
    turn: player1Name,
    winner: null,
    message: player1Name + ' starts the game.',
    players: {
      [player1Name]: player1,
      [player2Name]: player2
    }
  };

  const board = buildBoard();
  board[player1.position.y][player1.position.x] = player1Name;
  board[player2.position.y][player2.position.x] = player2Name;
  board[0][0] = 'base-red';
  board[BOARD_SIZE - 1][BOARD_SIZE - 1] = 'base-blue';
  game.board = board;

  games.set(game.id, game);
  return game;
}

function nextTurn(game) {
  const names = Object.keys(game.players);
  const current = game.turn;
  const next = names.find((name) => name !== current);
  game.turn = next || current;
}

function isPlayerTurn(game, playerName) {
  return game.turn === playerName;
}

app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Strategy Battle</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #0f172a;
        color: #e2e8f0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .container {
        width: min(980px, 95vw);
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 18px;
        overflow: hidden;
      }
      .header {
        background: #111827;
        padding: 18px 20px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .content {
        display: grid;
        grid-template-columns: 290px 1fr;
      }
      .panel {
        padding: 18px;
      }
      .sidebar {
        background: rgba(17, 24, 39, 0.8);
        border-right: 1px solid rgba(255,255,255,0.08);
      }
      .status-box, form {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 14px;
      }
      input, button {
        width: 100%;
        padding: 10px 12px;
        border-radius: 10px;
        border: none;
        margin-top: 10px;
        font-size: 1rem;
      }
      input {
        background: #e2e8f0;
        color: #0f172a;
      }
      button {
        background: #ef4444;
        color: white;
        cursor: pointer;
        font-weight: bold;
      }
      .moves {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-top: 14px;
      }
      .moves button:nth-child(1) { grid-column: 2; }
      .moves button:nth-child(2) { grid-column: 1; }
      .moves button:nth-child(3) { grid-column: 3; }
      .moves button:nth-child(4) { grid-column: 1; }
      .moves button:nth-child(5) { grid-column: 3; }
      #board {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 4px;
        background: #1f2937;
        border-radius: 12px;
        padding: 8px;
      }
      .cell {
        width: 42px;
        height: 42px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(255,255,255,0.06);
        background: #374151;
      }
      .cell.obstacle { background: #6b7280; }
      .cell.base-red { background: #dc2626; }
      .cell.base-blue { background: #2563eb; }
      .cell.player-red { background: #ef4444; }
      .cell.player-blue { background: #3b82f6; }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
      }
      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: inline-block;
      }
      @media (max-width: 760px) {
        .content { grid-template-columns: 1fr; }
        .sidebar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Turn-based Strategy Game</h1>
      </div>
      <div class="content">
        <aside class="panel sidebar">
          <form id="startForm">
            <h3>New Match</h3>
            <input id="player1" type="text" placeholder="Player 1 name" required />
            <input id="player2" type="text" placeholder="Player 2 name" required />
            <button type="submit">Start Game</button>
          </form>

          <div class="status-box" id="statusBox" style="margin-top:14px;">
            <strong>Status:</strong>
            <p>No game started yet.</p>
          </div>

          <div class="moves">
            <button data-direction="up">Up</button>
            <button data-direction="left">Left</button>
            <button data-direction="right">Right</button>
            <button data-direction="down">Down</button>
            <button id="attackBtn">Attack</button>
          </div>
        </aside>

        <main class="panel">
          <div id="board"></div>
          <div class="legend">
            <div class="legend-item"><span class="dot" style="background:#ef4444"></span> Player 1</div>
            <div class="legend-item"><span class="dot" style="background:#3b82f6"></span> Player 2</div>
            <div class="legend-item"><span class="dot" style="background:#dc2626"></span> Base 1</div>
            <div class="legend-item"><span class="dot" style="background:#2563eb"></span> Base 2</div>
            <div class="legend-item"><span class="dot" style="background:#6b7280"></span> Obstacle</div>
          </div>
        </main>
      </div>
    </div>

    <script>
      const boardEl = document.getElementById('board');
      const statusBox = document.getElementById('statusBox');
      let currentGame = null;
      let currentPlayer = '';

      function renderBoard(game) {
        boardEl.innerHTML = '';
        for (let y = 0; y < game.boardSize; y++) {
          for (let x = 0; x < game.boardSize; x++) {
            const cell = document.createElement('div');
            const value = game.board[y][x];
            cell.className = 'cell';

            if (value === 'obstacle') cell.classList.add('obstacle');
            if (value === 'base-red') cell.classList.add('base-red');
            if (value === 'base-blue') cell.classList.add('base-blue');
            if (value === game.players[Object.keys(game.players)[0]].name) cell.classList.add('player-red');
            if (value === game.players[Object.keys(game.players)[1]].name) cell.classList.add('player-blue');

            if (value === 'obstacle') {
              cell.textContent = '■';
            }

            boardEl.appendChild(cell);
          }
        }
      }

      function updateStatus(game) {
        if (!game) {
          statusBox.innerHTML = '<strong>Status:</strong><p>No game started yet.</p>';
          return;
        }

        const names = Object.keys(game.players);
        const p1 = game.players[names[0]];
        const p2 = game.players[names[1]];

        statusBox.innerHTML = '<strong>Status:</strong>' +
          '<p>' + game.message + '</p>' +
          '<p>Turn: <b>' + game.turn + '</b></p>' +
          '<p>' + p1.name + ': (' + p1.position.x + ', ' + p1.position.y + ')</p>' +
          '<p>' + p2.name + ': (' + p2.position.x + ', ' + p2.position.y + ')</p>';
      }

      document.getElementById('startForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const player1 = document.getElementById('player1').value.trim();
        const player2 = document.getElementById('player2').value.trim();

        if (!player1 || !player2) {
          alert('Please enter both player names.');
          return;
        }

        const response = await fetch('/api/game/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ player1, player2 })
        });

        const data = await response.json();
        if (!data.success) {
          alert(data.message);
          return;
        }

        currentGame = data.game;
        currentPlayer = player1;
        renderBoard(currentGame);
        updateStatus(currentGame);
      });

      document.querySelectorAll('[data-direction]').forEach((button) => {
        button.addEventListener('click', async function () {
          if (!currentGame) {
            alert('Start a game first.');
            return;
          }

          const direction = button.dataset.direction;
          const response = await fetch('/api/game/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              gameId: currentGame.id,
              player: currentPlayer,
              direction: direction
            })
          });

          const data = await response.json();
          if (!data.success) {
            alert(data.message);
            return;
          }

          currentGame = data.game;
          currentPlayer = currentGame.turn;
          renderBoard(currentGame);
          updateStatus(currentGame);

          if (currentGame.winner) {
            alert(currentGame.message);
          }
        });
      });

      document.getElementById('attackBtn').addEventListener('click', async function () {
        if (!currentGame) {
          alert('Start a game first.');
          return;
        }

        const response = await fetch('/api/game/attack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gameId: currentGame.id,
            player: currentPlayer
          })
        });

        const data = await response.json();
        if (!data.success) {
          alert(data.message);
          return;
        }

        currentGame = data.game;
        renderBoard(currentGame);
        updateStatus(currentGame);
        if (currentGame.winner) {
          alert(currentGame.message);
        }
      });
    </script>
  </body>
</html>`;

  res.send(html);
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  if (getUser(username)) {
    return res.status(400).json({ success: false, message: 'User already exists.' });
  }

  const user = {
    id: Date.now(),
    username,
    password
  };

  users.push(user);
  return res.status(201).json({ success: true, user: { id: user.id, username: user.username } });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const user = getUser(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  return res.json({
    success: true,
    user: { id: user.id, username: user.username },
    token: 'token-' + Date.now()
  });
});

app.post('/api/game/new', (req, res) => {
  const { player1, player2 } = req.body;

  if (!player1 || !player2) {
    return res.status(400).json({ success: false, message: 'Both player names are required.' });
  }

  if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
    return res.status(400).json({ success: false, message: 'Players must have different names.' });
  }

  const game = createGame(player1.trim(), player2.trim());
  return res.json({ success: true, game: game });
});

app.get('/api/game/:gameId', (req, res) => {
  const game = games.get(req.params.gameId); 
  if (!game) {
    return res.status(404).json({ success: false, message: 'Game not found.' });
  }

  return res.json({ success: true, game: game });
});

app.post('/api/game/move', (req, res) => {
  const { gameId, player, direction } = req.body;
  const game = games.get(gameId);

  if (!game) {
    return res.status(404).json({ success: false, message: 'Game not found.' });
  }

  if (game.winner) {
    return res.status(400).json({ success: false, message: 'This game is already over.' });
  }

  if (!isPlayerTurn(game, player)) {
    return res.status(400).json({ success: false, message: 'It is not this player\'s turn.' });
  }

  const deltaMap = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const delta = deltaMap[direction];
  if (!delta) {
    return res.status(400).json({ success: false, message: 'Invalid move direction.' });
  }

  const currentPlayer = game.players[player];
  if (!currentPlayer) {
    return res.status(400).json({ success: false, message: 'Player not found in this game.' });
  }

  const nextX = currentPlayer.position.x + delta.x;
  const nextY = currentPlayer.position.y + delta.y;

  if (!isInsideBoard(nextX, nextY)) {
    return res.status(400).json({ success: false, message: 'Move goes out of bounds.' });
  }

  if (isObstacle(nextX, nextY)) {
    return res.status(400).json({ success: false, message: 'You cannot move into an obstacle.' });
  }

  const opponentName = Object.keys(game.players).find((name) => name !== player);
  const opponent = game.players[opponentName];

  currentPlayer.position = { x: nextX, y: nextY };

  const board = buildBoard();
  Object.values(game.players).forEach((playerData) => {
    board[playerData.position.y][playerData.position.x] = playerData.name;
  });
  board[0][0] = 'base-red';
  board[BOARD_SIZE - 1][BOARD_SIZE - 1] = 'base-blue';
  game.board = board;

  if (nextX === opponent.base.x && nextY === opponent.base.y) {
    game.winner = player;
    game.message = player + ' captured the opponent base!';
    return res.json({ success: true, game: game });
  }

  const adjacent = isAdjacentToBase(nextX, nextY, opponent.base);
  game.message = adjacent
    ? player + ' moved next to the enemy base. Attack to capture it.'
    : player + ' moved ' + direction + '.';

  nextTurn(game);
  return res.json({ success: true, game: game });
});

app.post('/api/game/attack', (req, res) => {
  const { gameId, player } = req.body;
  const game = games.get(gameId);

  if (!game) {
    return res.status(404).json({ success: false, message: 'Game not found.' });
  }

  if (game.winner) {
    return res.status(400).json({ success: false, message: 'This game is already over.' });
  }

  const currentPlayer = game.players[player];
  if (!currentPlayer) {
    return res.status(400).json({ success: false, message: 'Player not found in this game.' });
  }

  const opponentName = Object.keys(game.players).find((name) => name !== player);
  const opponent = game.players[opponentName];

  if (!isAdjacentToBase(currentPlayer.position.x, currentPlayer.position.y, opponent.base)) {
    return res.status(400).json({ success: false, message: 'You must be adjacent to the enemy base to attack.' });
  }

  game.winner = player;
  game.message = player + ' attacked and captured ' + opponent.name + '\'s base!';
  return res.json({ success: true, game: game });
});

app.listen(PORT, () => {
  console.log('Strategy game API running on http://localhost:' + PORT);
});
