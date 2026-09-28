const express = require('express');
const router = express.Router();

const triviaQuestions = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars'
  },
  {
    question: 'What is the largest mammal in the world?',
    answer: 'Blue whale'
  }
];

const quizState = new Map();

function getPlayerState(req) {
  const sessionId = req.headers['x-session-id'] || 'guest';

  if (!quizState.has(sessionId)) {
    quizState.set(sessionId, {
      score: 0,
      index: 0,
      answered: false
    });
  }

  return quizState.get(sessionId);
}

function renderQuestionPage(question, score, index, total, message = '') {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trivia Quiz</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: white;
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
          }
          .card {
            background: rgba(15, 23, 42, 0.8);
            border-radius: 18px;
            padding: 32px;
            width: min(90vw, 600px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          }
          h1 { text-align: center; }
          form { display: flex; flex-direction: column; gap: 18px; }
          input, button {
            padding: 12px 14px;
            border-radius: 10px;
            border: none;
            font-size: 1rem;
          }
          input {
            background: #e2e8f0;
          }
          button {
            background: #22c55e;
            color: white;
            font-weight: bold;
            cursor: pointer;
          }
          .meta {
            margin-bottom: 16px;
            color: #cbd5e1;
          }
          .message {
            min-height: 24px;
            font-weight: bold;
            color: #fef08a;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="meta">Question ${index + 1} / ${total} | Score: ${score}</div>
          <h1>${question}</h1>
          <form method="POST" action="/quiz">
            <input type="text" name="answer" placeholder="Type your answer" required />
            <button type="submit">Submit Answer</button>
          </form>
          <div class="message">${message}</div>
        </div>
      </body>
    </html>
  `;
}

router.get('/quiz', (req, res) => {
  const state = getPlayerState(req);

  if (state.index >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const currentQuestion = triviaQuestions[state.index];
  const html = renderQuestionPage(
    currentQuestion.question,
    state.score,
    state.index,
    triviaQuestions.length
  );

  res.send(html);
});

router.post('/quiz', (req, res) => {
  const state = getPlayerState(req);

  if (state.index >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const currentQuestion = triviaQuestions[state.index];
  const submittedAnswer = (req.body.answer || '').trim();
  const isCorrect = submittedAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();

  if (isCorrect) {
    state.score += 1;
  }

  state.index += 1;
  state.answered = true;

  if (state.index >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const nextQuestion = triviaQuestions[state.index];
  const feedback = isCorrect
    ? `Correct! "${currentQuestion.answer}" is right.`
    : `Incorrect. The correct answer was "${currentQuestion.answer}".`;

  const html = renderQuestionPage(
    nextQuestion.question,
    state.score,
    state.index,
    triviaQuestions.length,
    feedback
  );

  res.send(html);
});

router.get('/quiz/score', (req, res) => {
  const state = getPlayerState(req);
  const finalScore = state.score;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Quiz Score</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #14532d, #0f172a);
            color: white;
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
          }
          .card {
            background: rgba(15, 23, 42, 0.8);
            padding: 32px;
            border-radius: 18px;
            text-align: center;
            width: min(90vw, 500px);
          }
          h1 { font-size: 2.5rem; }
          .score { font-size: 3rem; color: #facc15; }
          a {
            color: #fde68a;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Quiz Complete!</h1>
          <div class="score">Final Score: ${finalScore} / ${triviaQuestions.length}</div>
          <p>${finalScore === triviaQuestions.length ? 'Perfect score! Amazing work!' : 'Nice try! You can play again.'}</p>
          <a href="/quiz">Play Again</a>
        </div>
      </body>
    </html>
  `;

  res.send(html);
});

module.exports = router;
