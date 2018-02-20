'use strict';

const port = 5000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var header = require('./src/middleware/header');

const sign = require('./src/routes/sign/sign');
const profileImage = require('./src/routes/profile/image');

app.use(header());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/sign', sign);
app.get('/profile/image/:imageId', profileImage);

app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
});
