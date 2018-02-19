const account = require('../../config/account');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt-config');

module.exports = class SignDao {
    constructor(){};

    /**
     * @type {function}
     * @param {json} signData 
     */
    sign(signData) {
        if (signData.id != account.id) {
            return {
                'success': false,
                'message': 'invalid id'
            };
        } else {
            if (signData.password != account.password) {
                return {
                    'success': false,
                    'message': 'invalid password'
                };
            }
            return {
                'success': true,
                'message': jwt.sign({
                    'id': signData.id,
                    'password': signData.password
                }, jwtConfig.secret, {
                    expiresIn: jwtConfig.expiresIn
                })
            };
        }
    }
};
