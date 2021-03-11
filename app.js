const { json } = require('express');
const express = require('express'),
  mongoose = require('mongoose');

const db = mongoose
  .connect('mongodb://localhost:27017/bookAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log('mongoose is connected to mongo db');
    },
    (err) => console.log('Got this error when i tried to connect to mongodb', err)
  );

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 8080;

const bookRouter = express.Router();

bookRouter.route('/Books').get((req, res) => {
  let query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, (err, books) => {
    if (err) res.status(500).send(err);
    else res.json(books);
  });
});

bookRouter.route('/Books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) json.status(500).send(err);
    else res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
