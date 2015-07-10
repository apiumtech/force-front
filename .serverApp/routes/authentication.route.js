/**
 * Created by joanllenas on 3/26/15.
 */

var AuthenticationController = require("../controllers/authenticationController");

module.exports = function (app) {
    app.post('/api/authentication', AuthenticationController.authenticate);
};