require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Marketplace starter listening on http://localhost:${port}`);
});
