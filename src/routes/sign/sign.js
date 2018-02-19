const SignDao = require('../../dao/sign/SignDao');

module.exports = (request, response) => {
    let signDao = new SignDao();
    let signData = {
        'id': request.params.id,
        'password': request.params.password
    };

    let result = signDao.sign(signData);
    if (result.success) {
        response.status(200).send(result);
        return;
    }
    response.status(400).send(result);
};
