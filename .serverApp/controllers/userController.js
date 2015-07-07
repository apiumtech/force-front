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

exports.getUserExtraFields = function (request, response) {
    var fields = [
        { "Id":"abcd123", "Name": "Joan Llenas", "PhotoUrl": "/assets/img/user-2.jpg", "Campo1":"Valor campo 1", "Campo2":"Valor campo 2eee", "Campo3":"Valor campo 3", "Campo4":"Valor campo 4", "Campo5":"Valor campo 5", "Campo6":"Valor campo 6", "Campo7":"Valor campo 7" },
        { "Id":"abcd321", "Name": "Bruno Ràfols", "PhotoUrl": "/assets/img/user-2.jpg", "Campo1":"Valor campo 1zzz", "Campo2":"Valor campo 2", "Campo3":"Valor campo 3yyy", "Campo4":"Valor campo 4", "Campo5":"Valor campo 5", "Campo6":"Valor campo 6", "Campo7":"Valor campo 7" },
        { "Id":"abcd456", "Name": "Javier Lasterra", "PhotoUrl": "/assets/img/user-2.jpg", "Campo1":"Valor campo 1xxx", "Campo2":"Valor campo 2", "Campo3":"Valor campo 3", "Campo4":"Valor campo 4", "Campo5":"Valor campo 5", "Campo6":"Valor campo 6", "Campo7":"Valor campo 7" }
    ];
    response.json(fields);
};