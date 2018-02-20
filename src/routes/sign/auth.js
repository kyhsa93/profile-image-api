'use strict';

const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');
const jwtConfig = require('../../config/jwt-config');
const vaildateJwt = require('express-jwt')({secret: jwtConfig.secret});

/**
 * @type {function}
 * @param {string} id 
 */
function signToken(id) {
    return jwt.sign({id: id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}

/**
 * @type {function}
 * @param {null}
*/
function isAuthenticated() {
    return compose()
        .use(function (request, response, next) 
        {
            if (request.query && request.query.hasOwnProperty('access_token')) {
                request.headers.authorization = request.query.access_token;
            }
            vaildateJwt(request, response, next);
        })
        .use(function (request, response, next) {
            request.user = {
                id: request.user.id
            };
            next();
        }
    );
}

exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
