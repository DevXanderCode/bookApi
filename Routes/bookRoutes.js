/* eslint-disable no-param-reassign */
const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  bookRouter
    .route('/')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) return res.status(500).send(err);
        return res.json(books);
      });
    });
  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.status(500).json(err);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route('/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req.book;

      book.author = req.body.author;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      console.log(req.body);
      return res.json(book);
    });
  return bookRouter;
};

module.exports = routes;
