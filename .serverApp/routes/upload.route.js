/**
 * Created by justin on 3/20/15.
 */

var UploadController = require('../controllers/uploadController');
module.exports = function (app) {

    app.post('/upload', UploadController.upload);
};