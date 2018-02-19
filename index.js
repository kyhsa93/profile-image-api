'use strict';

const port = 5000;

const express = require('express');
const app = express();

const sign = require('./src/routes/sign/sign');
const profileImage = require('./src/routes/profile/image');

app.get('/sign/:id/:password', sign);
app.get('/profile/image/:imageId', profileImage);

app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
});
