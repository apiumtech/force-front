/**
 * Created by justin on 3/9/15.
 */

var fs = require("fs");

var translationController = {
    getLanguage: function (request, response) {
        var language = request.params.language;
        fs.readFile(__dirname + "/../translations/" + language + ".json", 'utf8', function (error, output) {
            if (error) throw error;

            response.json(JSON.parse(output));
        });
    }
};

module.exports = translationController;