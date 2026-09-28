const { questions, getQuestionById } = require('../models/quizModel');

const getQuizData = (req, res) => {
  const question = getQuestionById(req.params.id || 1);

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  return res.status(200).json(question);
};

const submitAnswer = (req, res) => {
  const { questionId, answer } = req.body;
  const question = getQuestionById(questionId);

  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const isCorrect = question.correctAnswer === answer;

  return res.status(200).json({
    correct: isCorrect,
    correctAnswer: question.correctAnswer,
    message: isCorrect ? 'Correct!' : 'Wrong answer!'
  });
};

const getScoreSummary = (req, res) => {
  res.status(200).json({
    totalQuestions: questions.length,
    score: 0,
    message: 'Score tracking is ready for the frontend.'
  });
};

module.exports = {
  getQuizData,
  submitAnswer,
  getScoreSummary
};
