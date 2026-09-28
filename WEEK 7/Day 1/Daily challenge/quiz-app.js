const express = require('express');
const path = require('path');
const quizRouter = require('./routes/quiz');

const app = express();
const port = 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', quizRouter);

app.listen(port, () => {
  console.log(`Trivia quiz app running on http://localhost:${port}`);
});
