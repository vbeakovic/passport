// Pull in modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

// Define port
const port = process.env.PORT || 8124;

// Init app
const app = express();

// Import routes
const index = require('./routes/index');
const users = require('./routes/users');

// View setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Handle requests
app.use('/', index);
app.use('/users', users);

// Start listening
app.listen(port, () => {
  console.log('Server started on port ' + port);
})
