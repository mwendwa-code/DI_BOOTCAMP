const questions = [
  {
    id: 1,
    question: 'Which planet is known as the Red Planet?',
    correctAnswer: 'Mars'
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    correctAnswer: 'Paris'
  },
  {
    id: 3,
    question: 'Which language runs on the web browser?',
    correctAnswer: 'JavaScript'
  }
];

const options = [
  { id: 1, option: 'Mars' },
  { id: 2, option: 'Venus' },
  { id: 3, option: 'Jupiter' },
  { id: 4, option: 'Paris' },
  { id: 5, option: 'Rome' },
  { id: 6, option: 'Berlin' },
  { id: 7, option: 'JavaScript' },
  { id: 8, option: 'Python' },
  { id: 9, option: 'C++' }
];

const questionOptions = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9]
};

module.exports = { questions, options, questionOptions };
