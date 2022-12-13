require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
// const db = require('./database/index.js');
// const controllers = require('./controllers/controllers.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT || 3001;
app.use((req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
