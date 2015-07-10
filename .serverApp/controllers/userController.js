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
        {
            "Id": 109,
            "Name": "Bruno Ràfols",
            "extrafields": [
                {
                    "Name": "Z_facebug",
                    "Value": "este es mi facebuk"
                },
                {
                    "Name": "Z_hasFB",
                    "Value": "True"
                },
                {
                    "Name": "Z_TestCurrency123",
                    "Value": "12,5600"
                },
                {
                    "Name": "zona",
                    "Value": "aa1"
                }
            ]
        },
        {
            "Id": 238,
            "Name": "Cristian Oyarzo",
            "extrafields": [
                {
                    "Name": "Z_facebug",
                    "Value": ""
                },
                {
                    "Name": "Z_hasFB",
                    "Value": "False"
                },
                {
                    "Name": "Z_TestCurrency123",
                    "Value": "0,0000"
                },
                {
                    "Name": "zona",
                    "Value": ""
                }
            ]
        }
    ];
    response.json(fields);
};