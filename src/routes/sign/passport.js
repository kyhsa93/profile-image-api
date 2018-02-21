'use strict';

const account = require('../../config/account');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
    passport.use(new LocalStrategy({

        //POST body id ,password
        usernameField: 'id',
        passwordField: 'password'
    }, function (id, password, done) {

        //사용자 인증 
        if (id === account.id && password === account.password) {
            let user = {id: id};
            return done(null, user);
        } else {
            return done(null, false, {message: 'fail'});
        }
    }));
};
