'use strict';

var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var mainPath = "__server/assets";
var port = 8081;
var delay = 1000;

var app = express();
app.use(bodyParser());
app.use(express.static("."));

var WidgetService = require(__dirname + "/widgetService");
var UserService = require(__dirname + "/userService");
var AccountService = require(__dirname + "/accountService");

function await(callback) {
    setTimeout(callback, delay);
}

app.get('/api/translations/:language', function (request, response) {
    var language = request.params.language;
    fs.readFile("./__server/translations/" + language + ".json", 'utf8', function (error, output) {
        if (error) throw error;

        response.json(JSON.parse(output));
    });
});

var widgetPageLists = {};

app.get('/api/widgets/:page', function (request, response) {
    await(function () {
        var page = request.params.page;
        if (widgetPageLists[page] == null) {
            var widgets = WidgetService.getWidgetFromPage(page);
            widgetPageLists[page] = {
                id: page,
                layout: "linear",
                body: widgets
            };
        }
        response.json({
            success: true,
            data: widgetPageLists[page]
        });

    });
});

app.put('/api/widgets', function (request, response) {
    await(function () {
        var pageId = request.body.id;
        widgetPageLists[pageId] = request.body;

        response.json({
            success: true,
            data: widgetPageLists[pageId]
        });
    });
});

app.get('/api/widget/:id', function (request, response) {
    var id = parseInt(request.params.id);
    await(function () {
        var widget = WidgetService.getWidget(id, request, response);

        if (!widget) {
            response.status(404);
            response.json({
                success: false,
                error: "Could not find the requested widget"
            });
            return;
        }

        response.json({
            success: true,
            data: {
                widgetId: widget.widgetId,
                params: widget.data
            }
        });
    });
});

app.get('/api/users', function (request, response) {
    await(function () {
        var users = UserService.getUsers();
        response.json({
            success: true,
            data: users
        });
    });
});

app.post('/api/accounts/dataTables', function (request, response) {
    await(function () {
        var data = AccountService.getFilterData(request);
        response.json({data: data});
    });
});

app.get('/api/accounts/availableOwners', function (request, response) {
    await(function () {
        var data = AccountService.getAvailableOwners(request.query);
        response.json(data);
    });
});

app.get('/api/accounts/environments', function (request, response) {
    await(function () {
        var data = AccountService.getEnvironments(request.query);
        response.json(data);
    });
});

app.get('/api/accounts/accountTypes', function (request, response) {
    await(function () {
        var data = AccountService.getAccountTypes(request.query);
        response.json(data);
    });
});

app.get('/api/accounts/views', function (request, response) {
    await(function () {
        var data = AccountService.getViews(request.query);
        response.json(data);
    });
});

app.get('/api/accounts/:id', function (request, response) {
    var id = request.params.id;
    await(function () {
        var data = AccountService.getAccount(id);
        response.json(data);
    });
});

app.post('/api/accounts/toggleFollow/:id', function (request, response) {
    var id = request.params.id;
    await(function () {
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
    });
});

module.exports = app;