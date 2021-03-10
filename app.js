const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
