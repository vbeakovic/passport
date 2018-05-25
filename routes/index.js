const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


// Home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// Register form
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Please fill in the registration data',
    reqData: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    error_message: ''
  });
});

// Register form process
router.post('/register', [
  check('name').not().isEmpty().withMessage('The Name cannot be empty'),
  check('username').not().isEmpty().withMessage('The Username cannot be empty'),
  check('email').not().isEmpty().withMessage('The Email cannot be empty'),
  check('email').isEmail().withMessage('The Email has to be a properly formatted email'),
  check('password').not().isEmpty().withMessage('The Password cannot be empty'),
  check('passwordConfirm').not().isEmpty().withMessage('The Password Confirmation cannot be empty'),
  check('passwordConfirm').not().isEmpty().custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      } else {
          return new Promise((resolve, reject) => {
            resolve();
          });
      }
})
],(req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    res.render('register', {
      title: 'Please fill in the registration data',
      reqData: {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      },
      error_message: errors.mapped()
    });
  } else {
    res.redirect('/');
            }
});

module.exports = router;
