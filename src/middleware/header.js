/**
 * Cross-Origin Resource Sharing 해결을 위한 response header 설정
 */
var _map = {
    'Access-control-Allow-Headers': 'X-Requested-With, content-type, access_token',
    'Access-control-Allow-Methods': 'GET, POST',
    'Access-control-Allow-Credentials': true,
    'Cache-Control': 'public'
};

var _setHeader = (response, header, value) => response.setHeader(header, value);

module.exports = allowedCors => {
    return (request, response, next) => {
        var origin = request.headers.origin;
        if (origin) {
            response.setHeader('Access-Control-Allow-Origin', origin);
        }

        Object.keys(_map).forEach(
            key => _setHeader(response, key, _map[key])
        );

        next();
    };
};
