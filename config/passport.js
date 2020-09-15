const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const utils = require('./utils.js');

// Passort serialize and Deserialize
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Passport local strategy
passport.use(new LocalStrategy({
  passReqToCallback: true // pass request to the callback
},
  function (req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        req.flash('danger', 'Incorrect username or password.');
        return done(null, false);
      }
      user.checkPassword(password, function (err, result) {
        if (err)
        return next(err);
        if (!result) {
          req.flash('danger', 'Incorrect  username or password.');
          return done(null, false);
        }
        return done(null, user);
      });
    }).select("+password"); // for returning password which is hidden by defualt
  }
));
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));