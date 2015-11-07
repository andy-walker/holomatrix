/// <reference path='../../typings/node/node.d.ts' />
/// <reference path='../../typings/express/express.d.ts' />
var express = require('express');
var app = express();
var webroot = __dirname + '/../client';
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: webroot });
});
app.use(express.static(webroot));
app.listen(3000);
