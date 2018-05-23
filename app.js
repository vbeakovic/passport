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
// const users = require('./routes/users');

// View setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static files folder
app.use(express.static(path.join(__dirname, 'public')));

// External css and js
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


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
// app.use('/users', users);


// Start listening
app.listen(port, () => {
  console.log('Server started on port ' + port);
})
