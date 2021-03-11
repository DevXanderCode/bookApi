const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

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

const app = express();

const port = process.env.PORT || 8080;

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());

bookRouter = require('./Routes/bookRoutes')();

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my book Api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
