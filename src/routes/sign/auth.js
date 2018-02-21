'use strict';

const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');
const jwtConfig = require('../../config/jwt-config');
const vaildateJwt = require('express-jwt')({secret: jwtConfig.secret});

/**
 * 인증된 token을 발급
 * @type {function}
 * @param {string} id
 */
function signToken(id) {
    return jwt.sign({id: id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}

/**
 * 인증된 token을 가지고 있는지 확인
 * @type {function}
 * @param {null}
*/
function isAuthenticated() {
    return compose()
        .use(function (request, response, next) 
        {
            //access_token이 query로 들어올 경우 헤더에 저장
            if (request.query && request.query.hasOwnProperty('access_token')) {
                request.headers.authorization = 'Bearer ' + request.query.access_token;
            }
            //access_token이 params로 들어올 경우 헤더에 저장
            if (request.headers['access_token']) {
                request.headers.authorization = 'Bearer ' + request.headers['access_token'];
            }
            //token 검증
            if (request.headers.authorization) {
                vaildateJwt(request, response, next);
            } else {
                response.status(401).send({
                    success: false,
                    message: 'token is not exist'
                });
            }
        })
        .use(function (request, response, next) {
            //user 정보 저장
            request.user = {
                id: request.user.id
            };
            next();
        }
    );
}

exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
