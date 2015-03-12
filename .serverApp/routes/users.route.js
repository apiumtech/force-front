/**
 * Created by justin on 3/9/15.
 */

var UserController = require("../controllers/userController");

module.exports = function (app) {
    app.get('/api/users', UserController.getAllUsers);
};