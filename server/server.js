/// <reference path='../../typings/node/node.d.ts' />
/// <reference path='../../typings/express/express.d.ts' />
/// <reference path='../../typings/socket.io/socket.io.d.ts' />
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var webroot = __dirname + '/../client';
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: webroot });
});
app.use(express.static(webroot));
io.on('connection', function (socket) {
    console.log('client connected');
    socket.on('disconnect', function () {
        console.log('client disconnected');
    });
});
server.listen(3000);
