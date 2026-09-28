const express = require('express');
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
