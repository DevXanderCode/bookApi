const express = require('express'),
  mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/bookAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 8080;

const bookRouter = express.Router();

bookRouter.route('/Books').get((req, res) => {
  // let responseJson = { hello: 'This is my Api' };
  Book.find((err, books) => {
    if (err) res.status(500).send(err);
    else res.json(books);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
