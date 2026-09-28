const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🌙', name: 'Moon' },
  { emoji: '🌍', name: 'Earth' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🎧', name: 'Headphones' },
  { emoji: '🍉', name: 'Watermelon' },
  { emoji: '⚽', name: 'Soccer Ball' },
  { emoji: '🌞', name: 'Sun' },
  { emoji: '📚', name: 'Book' },
  { emoji: '🍎', name: 'Apple' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🌈', name: 'Rainbow' }
];

let currentQuestion = null;
const leaderboard = [
  { name: 'Ava', score: 5 },
  { name: 'Noah', score: 4 },
  { name: 'Mila', score: 3 }
];

function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestion() {
  const correct = emojis[Math.floor(Math.random() * emojis.length)];
  const distractors = shuffleArray(
    emojis.filter((item) => item.name !== correct.name)
  ).slice(0, 3);

  const options = shuffleArray([
    correct.name,
    ...distractors.map((item) => item.name)
  ]);

  currentQuestion = {
    emoji: correct.emoji,
    correctAnswer: correct.name,
    options
  };

  return currentQuestion;
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/question', (req, res) => {
  res.json(generateQuestion());
});

app.post('/api/guess', (req, res) => {
  const { guess } = req.body || {};

  if (!currentQuestion) {
    return res.status(400).json({ message: 'No question is active yet.' });
  }

  const isCorrect = guess === currentQuestion.correctAnswer;

  res.json({
    correct: isCorrect,
    emoji: currentQuestion.emoji,
    correctAnswer: currentQuestion.correctAnswer,
    feedback: isCorrect
      ? 'Correct! Nice guess!'
      : `Not quite. The correct answer was ${currentQuestion.correctAnswer}.`
  });
});

app.get('/api/leaderboard', (req, res) => {
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
  res.json(sorted);
});

app.post('/api/leaderboard', (req, res) => {
  const { name, score } = req.body || {};

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ message: 'Name and score are required.' });
  }

  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);

  res.json(leaderboard.slice(0, 5));
});

app.listen(port, () => {
  console.log(`Emoji guessing game is running on http://localhost:${port}`);
});
