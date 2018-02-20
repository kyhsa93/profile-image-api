'use strict';

const passport = require('passport');
const auth = require('./auth');

require('./passport').setup();

module.exports = (request, response) => {
    passport.authenticate('local', function (err, user, info) {
        let error = err || info;
        if (error) return response.status(401).json({success: false, message: error});
        if (!user) return response.status(404).json({success: false, message: 'please try again.'});

        let token = auth.signToken(user.id);
        response.status(200).json({
            success: true,
            message: token
        });
    })(request, response);
};
