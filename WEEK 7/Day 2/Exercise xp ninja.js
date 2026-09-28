const express = require('express');

const app = express();
const PORT = 3015;

const questions = [
  {
    id: 1,
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter'],
    correctAnswer: 'Mars'
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    options: ['Paris', 'Rome', 'Berlin'],
    correctAnswer: 'Paris'
  },
  {
    id: 3,
    question: 'Which language runs in the browser?',
    options: ['JavaScript', 'Python', 'C++'],
    correctAnswer: 'JavaScript'
  }
];

app.use(express.json());

app.get('/api/questions', (req, res) => {
  res.status(200).json(questions);
});

app.get('/api/questions/:id', (req, res) => {
  const question = questions.find((item) => item.id === Number(req.params.id));

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  return res.status(200).json(question);
});

app.post('/api/quiz/answer', (req, res) => {
  const { questionId, answer } = req.body;
  const question = questions.find((item) => item.id === Number(questionId));

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const correct = question.correctAnswer === answer;
  return res.status(200).json({
    correct,
    correctAnswer: question.correctAnswer,
    message: correct ? 'Correct answer!' : 'Wrong answer!'
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Quiz single-file app running on http://localhost:${PORT}`);
});
