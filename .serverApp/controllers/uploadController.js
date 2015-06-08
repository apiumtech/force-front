/**
 * Created by justin on 3/20/15.
 */

var fs = require('fs');
var utils = require('../utils');

function UploadController() {
    this.uploadDocumentFolder = 'uploads/documents';
    this.uploadImagesFolder = 'assets/uploads';
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
    },
    uploadDocument: function (req, res) {
        var uploadDocumentFolder = 'uploads/documents';
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log(req);
            console.log(req.body.extracted);

            fs.exists(uploadDocumentFolder, function (exists) {
                if (!exists) {
                    fs.mkdirSync(uploadDocumentFolder);
                }

                fstream = fs.createWriteStream(uploadDocumentFolder + '/' + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    setTimeout(function () {
                        res.json({
                            fileUrl: uploadDocumentFolder + '/' + filename
                        });
                    }, utils.generateRandom(1000, 5000));
                });
            });
        });
    }
};

var instance = new UploadController();

module.exports = instance;