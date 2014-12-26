/**
 * Created by justin on 12/17/14.
 */
var express = require('express');
var port = 8065;
var mainPath = "__server/assets";

var app = express();
app.use(express.static(mainPath));

app.get('/img/*', function (req, res) {
    app.render(mainPath + req.url);
});

app.get('/api/widgets/intensity', function (request, response) {
    setTimeout(function () {
        response.end(JSON.stringify({
            success: true,
            data: [
                {
                    widgetType: "graph",
                    widgetName: "Widget A",
                    widgetId: "1",
                    order: 1,
                    columns: 1
                },
                {
                    widgetType: "table",
                    widgetName: "Widget B",
                    widgetId: "2",
                    order: 2,
                    columns: 1
                },
                {
                    widgetType: "table",
                    widgetName: "Widget C",
                    widgetId: "3",
                    order: 3,
                    columns: 1
                }
            ]
        }));
    }, 1000);
});

app.get('/api/widget/:id', function (request, response) {
    var id = request.params.id;
    setTimeout(function () {
        response.end(JSON.stringify({
            success: true,
            data: {
                widgetId: id,
                params: "{img: 'http://" + getDomain() + "/img/intensity-chart-" + id + ".jpg'}"
            }
        }));
    }, 1000);
});

function getDomain() {
    return (port && port != 80) ? "localhost:" + port : "localhost";
}

app.listen(port);