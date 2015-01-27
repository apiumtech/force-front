'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mainPath = "__server/assets";
var port = 8081;
var delay = 1000;

var app = express();
app.use(bodyParser());
app.use(express.static("./__server/assets"));

app.get('/img/*', function (req, res) {
    app.render(mainPath + req.url);
});

var WidgetService = require(__dirname + "/widgetService");
app.get('/api/widgets/:page', function (request, response) {
    setTimeout(function () {
        var page = request.params.page;
        var widgets = WidgetService.getWidgetFromPage(page);
        response.json({
            id: page,
            layout: "linear",
            body: widgets
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

app.post('/api/widget/:id/move', function (request, response) {
    var oldIndex = request.body.oldIndex;
    var newIndex = request.body.newIndex;
    var result = WidgetService.moveWidget(parseInt(request.params.id), oldIndex, newIndex, request, response);

    if (result) {
        response.json({
            success: true
        });
        return;
    }
});

function getDomain() {
    return (port && port !== 80) ? "localhost:" + port : "localhost";
}

//app.listen(port);
module.exports = app;