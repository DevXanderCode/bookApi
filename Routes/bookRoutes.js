/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controller/bookController');

const routes = (Book) => {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/').post(controller.post).get(controller.get);
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
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        delete req.body_id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) return res.send(err);
        return res.sendStatus(204);
      });
    });
  return bookRouter;
};

module.exports = routes;
