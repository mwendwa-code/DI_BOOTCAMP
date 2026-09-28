const express = require('express');
const path = require('path');
const greetingRouter = require('./routes/greeting');

const app = express();
const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', greetingRouter);

app.listen(port, () => {
  console.log(`Emoji Greeting app running on http://localhost:${port}`);
});
