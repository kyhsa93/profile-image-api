'use strict';

const passport = require('passport');
const auth = require('./auth');

//passport setting
require('./passport').setup();

/**
 * passport를 이용한 사용자 인증 및 토큰 발급하여 전송
 * @param {object} request http reqeust
 * @param {object} response http response
 */
module.exports = (request, response) => {
    passport.authenticate('local', function (err, user, info) {
        let error = err || info;
        if (error) return response.status(401).json({success: false, message: error});
        if (!user) return response.status(404).json({success: false, message: 'please try again.'});

        //jwt 발급 및 전송
        let token = auth.signToken(user.id);
        response.status(200).json({
            success: true,
            message: token
        });
    })(request, response);
};
