/**
 * Created by justin on 3/9/15.
 */

var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var fs = require('fs');

var util = require('./utils');

module.exports = function () {
    var app = express();
    app.use(bodyParser());
    app.use(busboy());
    app.use(express.static("."));

    fs.exists('uploads', function (exists) {
        if (!exists) {
            fs.mkdirSync('uploads');
        }
    });

    util.getGlobbedFiles(__dirname + '/routes/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    return app;
};