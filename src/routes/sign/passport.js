'use strict';

const account = require('../../config/account');

let passport  = require('passport');
let LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    }, function (id, password, done) {
        if (id === account.id && password === account.password) {
            let user = {id: id};
            return done(null, user);
        } else {
            return done(null, false, {message: 'fail'});
        }
    }));
};
