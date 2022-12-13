const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURI = 'mongodb://localhost/rps';

mongoose.connect(mongoURI)
  .then(db => console.log(`Connected to db on ${mongoURI}`))
  .catch(err => console.log(`Could not connect to ${mongoURI}. Error ${err}`));

