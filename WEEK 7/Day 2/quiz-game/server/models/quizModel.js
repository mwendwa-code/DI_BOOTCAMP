const { questions, options, questionOptions } = require('../config/db');

const getQuestionById = (id) => {
  const question = questions.find((item) => item.id === Number(id));

  if (!question) return null;

  const availableOptions = (questionOptions[question.id] || []).map((optionId) =>
    options.find((option) => option.id === optionId)
  ).filter(Boolean);

  return {
    ...question,
    options: availableOptions
  };
};

module.exports = {
  questions,
  options,
  questionOptions,
  getQuestionById
};
