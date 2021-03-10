const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

const bookRouter = express.Router();

bookRouter.route('/Books').get((req, res) => {
  let responseJson = { hello: 'This is my Api' };

  res.json(responseJson);
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
