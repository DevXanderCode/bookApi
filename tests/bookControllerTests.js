// eslint-disable-next-line no-unused-vars
const should = require('should');
const sinon = require('sinon');
const bookContoller = require('../controller/bookController');

// mocha follows a BDD kind of style
describe('Book Controller Tests:', () => {
  describe('Posts', () => {
    it('should not allow an empty title on post', () => {
      // eslint-disable-next-line no-unused-vars, func-names
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: 'Nerdy',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookContoller(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is Required').should.equal(true);
    });
  });
});
