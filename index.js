'use strict';

let port = 5000;

let express = require('express');
let app = express();

let profileImage = require('./src/routes/profile/image');

app.get('/profile/image/:imageId');

app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
});
