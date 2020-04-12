// Reference
//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

//
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database-config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

//User db route setup
require('./routes/user-routes.js')(app);

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
