var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use('/', require('./controllers'));

app.listen(3333, function () {
    console.log('Server listening on 3333.');
});