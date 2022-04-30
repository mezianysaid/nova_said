var passport = require('passport');
var LocatStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
var User = require('../models/user.model');

passport.use(
    new LocatStrategy({ usernameField: 'email' }, function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            //Return if user not found in databese
            else if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            //Return if password is wrong
            else if (!user.validPassword(password)) {
                // console.log("Password is wrong")
                return done(null, false, { message: 'Password is wrong' });
            }
            //If credentials are correct, return the user object
            else return done(null, user);
        });
    }));