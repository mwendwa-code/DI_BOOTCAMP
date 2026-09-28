const express = require('express');
const path = require('path');
const router = express.Router();

const emojis = ['😀', '🎉', '🌟', '🎈', '👋'];

router.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Emoji Greeting App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1d4ed8, #0f172a);
            color: white;
            min-height: 100vh;
            display: grid;
            place-items: center;
            margin: 0;
          }
          .card {
            background: rgba(15, 23, 42, 0.8);
            padding: 32px;
            border-radius: 18px;
            width: min(90vw, 500px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }
          h1 { text-align: center; }
          form { display: flex; flex-direction: column; gap: 16px; }
          input, select, button {
            padding: 12px 14px;
            border-radius: 10px;
            border: none;
            font-size: 1rem;
          }
          select, input {
            background: #e2e8f0;
          }
          button {
            background: #22c55e;
            color: white;
            font-weight: bold;
            cursor: pointer;
          }
          .emoji-options {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            font-size: 2rem;
            margin-top: 6px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Emoji Greeting App</h1>
          <form action="/greet" method="POST">
            <label>
              <span>Your name:</span><br />
              <input type="text" name="name" placeholder="Enter your name" required />
            </label>

            <label>
              <span>Select an emoji:</span>
              <div class="emoji-options">
                ${emojis
                  .map(
                    (emoji) => `
                      <label title="${emoji}">
                        <input type="radio" name="emoji" value="${emoji}" required />
                        <span>${emoji}</span>
                      </label>
                    `
                  )
                  .join('')}
              </div>
            </label>

            <button type="submit">Greet Me!</button>
          </form>
        </div>
      </body>
    </html>
  `;

  res.send(html);
});

router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).send('Please enter your name.');
  }

  if (!emoji || !emojis.includes(emoji)) {
    return res.status(400).send('Please select a valid emoji.');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Greeting</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0f766e, #1d4ed8);
            min-height: 100vh;
            display: grid;
            place-items: center;
            margin: 0;
            color: white;
          }
          .card {
            background: rgba(15, 23, 42, 0.75);
            padding: 32px;
            border-radius: 18px;
            text-align: center;
            box-shadow: 0 20px 35px rgba(0,0,0,0.3);
          }
          h1 { font-size: 2.5rem; }
          .emoji { font-size: 5rem; }
          a {
            color: #fef08a;
            display: inline-block;
            margin-top: 18px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="emoji">${emoji}</div>
          <h1>Hello, ${name.trim()}!</h1>
          <p>Have a wonderful day! ${emoji}</p>
          <a href="/">Back to form</a>
        </div>
      </body>
    </html>
  `);
});

module.exports = router;
