const express = require('express');
const mongoose = require('mongoose');

if (process.env.ENV === 'Test') {
  console.log('This is a Test');
  const db = mongoose
    .connect('mongodb://localhost:27017/bookAPI_Test', {
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
} else {
  console.log('This is not a Test');
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
}

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

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
