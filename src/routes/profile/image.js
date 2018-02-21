'use strict';

const jimp = require('jimp');
const fs = require('fs');
const NodeCache = require('node-cache');
const cache = new NodeCache();

/**
 * @type {function} 완성된 이미지 전송
 * @param {object} requested 
 * @param {object} response http response
 */
function responseImage(requested, response) {
    try {
        //전송할 file이 존재하는지 검사
        fs.readFileSync(`./images/${requested.imageId}.jpeg`);
    } catch (error) {
        //cache에 있는 image data가 실제 image file과 다를때
        response.status(500).send({
            success: false,
            message: 'please try again later'
        });
        return;
    }
    response.writeHead(200, {
        'content-type': 'image/jpeg',
        'last-modified': 'Sun, 18 Feb 2018 08:20:39 GMT'
    });
    response.end(fs.readFileSync(`./images/${requested.imageId}.jpeg`));
}

/**
 * @type {function} 이미지 resizing 및 rotate
 * @param {object} requested 
 * @param {object} response http response
 */
function resize(requested, response) {
    //image file read
    jimp.read(`./images/${requested.imageId}.png`)
        .then(image => {
            //resize, rotate 
            return image.resize(requested.width, requested.height).rotate(requested.rotate)
                //새로운 image file 생성
                .write(`./images/${requested.imageId}.jpeg`, () => {
                    responseImage(requested, response);
                    //cache에 데이터 저장 caching 시간이 지나야 이미지 수정 가능
                    cache.set(requested.id, requested, 10);
                });
        }).catch(error => {
            //fail to read image file
            response.status(400).send({
                success: false,
                message: 'fail'
            });
        });
}

/**
 * 이미지를 resizing 및 rotate 하여 전송
 * @param {object} request http request
 * @param {object} response http response
 */
module.exports = (request, response) => {
    //query string으로 이미지 재구성에 대한 정보 확인
    if (request.query.width && request.query.height && request.query.rotate) {
        //params와 query string에 들어있는 정보를 object로 정리
        let requested = {
            id: request.user.id,
            imageId: request.params.imageId,
            width: parseInt(request.query.width),
            height: parseInt(request.query.height),
            rotate: parseInt(request.query.rotate)
        };
        //cache에 정보가 있는지 확인
        cache.get(requested.id, (error, value) => {
            //정보가 있을경우 미리 처리되어있던 이미지 전송
            //정보가 없을경우 이미지 작업후 새로 만들어진 이미지 전송
            value ? responseImage(value, response) : resize(requested, response);
        });
    } else {
        //query string이 형식에 맞게 오지 않았을 경우
        response.status(400).send({
            success: false,
            message: 'invalid query string'
        });
    }
};
