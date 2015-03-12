/**
 * Created by justin on 3/9/15.
 */


var AccountService = require('../services/accountService');

var accountController = {
    getFilteredData: function (request, response) {
        var data = AccountService.getFilterData(request);
        response.json(data);
    },
    getAvailableEnvironments: function (request, response) {
        var data = AccountService.getEnvironments(request.query);
        response.json(data);

    },
    getAvailableOwners: function (request, response) {
        var data = AccountService.getAvailableOwners(request.query);
        response.json(data);
    },
    getAvailableAccountTypes: function (request, response) {
        var data = AccountService.getAccountTypes(request.query);
        response.json(data);
    },
    getViews: function (request, response) {
        var data = AccountService.getViews(request.query);
        response.json(data);
    },
    getAccount: function (request, response) {
        var id = request.params.id;
        try {
            var data = AccountService.getAccount(id);

            response.json(data);
        } catch (e) {
            if (e.message == "AccountNotFound") {
                response.status(404).json({
                    error: "Requested User not found"
                });
            }
            else {
                response.status(500).send(e);
            }
        }
    },
    getSummaryAccount: function (request, response) {
        var id = request.params.id;
        var data = AccountService.getSummaryAccount(id);
        response.json(data);
    },
    updateAccount: function (request, response) {
        var id = request.params.id;
        var data = AccountService.updateAccount(id, request.body);
        response.json(data);
    },
    toggleFollow: function (request, response) {
        var id = request.params.id;
        try {
            var account = AccountService.toggleFollow(id);
            response.json(account);
        }
        catch (error) {
            if (error.message == "Requested User cannot be found")
                response.status(404).json({
                    error: "Requested user not found"
                });
            console.log(error);
            response.status(500).send(error);
        }
    }
};

module.exports = accountController;