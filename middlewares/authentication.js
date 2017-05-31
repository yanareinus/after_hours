const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findOne({ where: {username: username}}).then(function(user) {
          if (!user) {
              console.log("cant find user");
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!passwordsMatch(password, user.password)) {
              console.log("password wrong");
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      }).catch(function(err) {
          console.log("errors");
          return done(err);
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then((user) => {
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  })
});

module.exports = passport;
