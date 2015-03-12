/**
 * Created by justin on 3/9/15.
 */

var UserService = require('../services/userService');

exports.getAllUsers = function (request, response) {
    var users = UserService.getUsers();
    response.json({
        success: true,
        data: users
    });
};