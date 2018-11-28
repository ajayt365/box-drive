const express = require('express');
require('dotenv').config();
require('./utils/database');

const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 3001;

require('./models/user.model');
// middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('testing');
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
