/**
 * Created by Justin on 7/9/2015.
 */
define([], function () {
    function FileService() {

    }

    FileService.prototype.getFileExtension = function (fileName) {
        if (fileName.lastIndexOf('.') == -1)
            return '';

        return fileName.substr(fileName.lastIndexOf('.') + 1);
    };

    return FileService;
});