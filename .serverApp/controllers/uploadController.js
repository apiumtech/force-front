/**
 * Created by justin on 3/20/15.
 */

var fs = require('fs');
var utils = require('../utils');

function UploadController() {

}

UploadController.prototype = {
    upload: function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            fstream = fs.createWriteStream('assets/uploads/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                setTimeout(function () {
                    res.json({
                        imageUrl: '/assets/uploads/' + filename
                    });
                }, utils.generateRandom(1000, 5000));
            });
        });
    }
};

var instance = new UploadController();

module.exports = instance;