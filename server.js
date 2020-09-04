const express = require('express');
const app = express();
const port = 3000;

const database = require('./database');
const apiRouter = require('./api');

database();
app.use(apiRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
});
