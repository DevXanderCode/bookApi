const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  bookRouter
    .route('/')
    .post((req, res) => {
      let book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
    .get((req, res) => {
      let query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) res.status(500).send(err);
        else res.json(books);
      });
    });

  bookRouter
    .route('/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) json.status(500).send(err);
        else res.json(book);
      });
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) json.status(500).send(err);
        else {
          book = { ...req.body };
          book.save();
          console.log(req.body);
          res.json(book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
