const express = require('express');
const { getQuizData, submitAnswer, getScoreSummary } = require('../controllers/quizController');

const router = express.Router();

router.get('/quiz/:id', getQuizData);
router.get('/quiz', getQuizData);
router.post('/quiz/answer', submitAnswer);
router.get('/score', getScoreSummary);

module.exports = router;
