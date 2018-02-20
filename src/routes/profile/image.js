'use strict';

const jimp = require('jimp');
const fs = require('fs');

module.exports = (request, response) => {
    if (request.query.width && request.query.height && request.query.rotate) {
        let imageId = request.params.imageId;
        let width = parseInt(request.query.width);
        let height = parseInt(request.query.height);
        let rotate = parseInt(request.query.rotate);

        jimp
        .read(`./images/${imageId}.png`)
        .then(image => {
            return image.resize(width, height).rotate(rotate)
                .write(`./images/${imageId}.jpeg`, () => {
                    response.writeHead(200, {
                        // 'content-length': 10860,
                        'content-type': 'image/jpeg',
                        'last-modified': 'Sun, 18 Feb 2018 08:20:39 GMT'
                    });
                    response.end(fs.readFileSync(`./images/${imageId}.jpeg`));
                });
        }).catch(error => {
            response.status(400).json({
                'success': false,
                'message': 'fail'
            });
        });
    } else {
        response.status(400).json({
            'success': false,
            'message': 'invalid query string'
        });
    }
};
