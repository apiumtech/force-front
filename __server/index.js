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

app.get('/img/*', function (req, res) {
    app.render('./assets/' + req.url);
});

var WidgetService = require(__dirname + "/widgetService");

app.get('/api/translations/:language', function (request, response) {
    var language = request.params.language;
    fs.readFile("./__server/translations/" + language + ".json", 'utf8', function (error, output) {
        if (error) throw error;

        response.json(JSON.parse(output));
    });
});

var widgetPageLists = {};

app.get('/api/widgets/:page', function (request, response) {
    setTimeout(function () {
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

    }, delay);
});

app.put('/api/widgets', function (request, response) {
    setTimeout(function () {
        var pageId = request.body.id;
        widgetPageLists[pageId] = request.body;

        response.json({
            success: true,
            data: widgetPageLists[pageId]
        });
    }, delay);
});

app.get('/api/widget/:id', function (request, response) {
    var id = parseInt(request.params.id);
    setTimeout(function () {
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
    }, delay);
});

function getDomain() {
    return (port && port !== 80) ? "localhost:" + port : "localhost";
}

//app.listen(port);
module.exports = app;