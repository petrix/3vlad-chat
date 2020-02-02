var express = require('express');
var app = module.exports = express();
var http = require('http');
var fs = require('fs');
var httpPORT =process.env.PORT || 3000;
var httpServer = http.createServer(app).listen(httpPORT, function () {
    console.log('HTTP Server Listener Started:'.bold, httpPORT);
});


// app.use(function (req, res, next) {
//     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     res.header('Expires', '-1');
//     res.header('Pragma', 'no-cache');
//     next();
// });

app.use('/config', express.static(__dirname + '/public/config.html'));
app.use('/', express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});