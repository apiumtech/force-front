/**
 * Created by justin on 12/17/14.
 */
var express = require('express');
var bodyParser = require('body-parser');
var port = 8065;
var mainPath = "__server/assets";
var delay = 1000;

var app = express();
app.use(bodyParser());
app.use(express.static(mainPath));

app.get('/img/*', function (req, res) {
    app.render(mainPath + req.url);
});

var WidgetService = require(__dirname + "/__server/widgetService");
app.get('/api/widgets/:page', function (request, response) {
    setTimeout(function () {
        var page = request.params.page;
        var widgets = WidgetService.getWidgetFromPage(page);
        response.json({
            success: true,
            data: widgets
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
                params: '{"img": "http://' + getDomain() + '/img/intensity-chart-' + id + '.jpg"}'
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
    return (port && port != 80) ? "localhost:" + port : "localhost";
}

(function(){
    var app2 = express();
    app2.use(bodyParser());
    app2.use(express.static(__dirname));
    app2.listen(8081);
})();

app.listen(port);