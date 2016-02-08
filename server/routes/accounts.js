/* eslint strict: 0, no-console: 0 */
'use strict';

const Firebase = require('firebase');
const crypto = require('crypto');

const firebase = new Firebase('https://automat.firebaseio.com/');
const users = firebase.child('users');

function hash(password) {
  return crypto.createHash('sha512').update(password).digest('hex');
}

const router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
  resave: false,
  saveUninitialized: true,
  secret: '1234qwerty'
}));
router.post('/api/signup', function cb(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.json({signedIn: false, message: 'No username or password'});
  }

  users.child(username).once('value', function get(snapshot) {
    if (snapshot.exists()) {
      return res.json({signedIn: false, message: 'User already exists'});
    }

    const userObj = {
      username: username,
      passwordHash: hash(password)
    };

    users.child(username).set(userObj);
    req.session.user = userObj;

    res.json({signedIn: true, user: userObj});
  });
});

router.post('/api/signin', function get(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.json({signedIn: false, message: 'No username or password'});
  }

  users.child(username).once('value', function cb(snapshot) {
    if (!snapshot.exists() || snapshot.child('passwordHash').val() !== hash(password)) {
      return res.json({signedIn: false, message: 'Wrong username or password'});
    }

    const user = snapshot.exportVal();
    req.session.user = user;
    res.json({signedIn: true, user: user});
  });
});

router.post('/api/signout', function cb(req, res) {
  delete req.session.user;
  res.json({signedIn: false, message: 'You signed out successfully!'});
});

module.exports = router;
