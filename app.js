const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
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
    (err) => console.log('Got this error when i tried to connect to mongodb', err),
  );

const Book = require('./models/bookModel');

const app = express();

const port = process.env.PORT || 3000;

// Here we are configuring express middleware to take object as the post data.
app.use(express.json());

const bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
