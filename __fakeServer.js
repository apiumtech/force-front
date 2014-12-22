/**
 * Created by justin on 12/17/14.
 */
var express = require('express');
var port = 8065;
var mainPath = "__server/assets";

var app = express();
app.use(express.static(mainPath));

app.get('/img/*', function (req, res) {
    console.log('Req.url', req.url);
    app.render(mainPath + req.url);
});

app.get('/api/widgets/intensity/:id', function (request, response) {
    var id = request.params.id;
    setTimeout(function () {
        response.end(JSON.stringify({
            success: true,
            data: {
                imgUrl: "http://" + getDomain() + "/img/intensity-chart-" + id + ".jpg",
                widgetId: "",
                widgetType: "",
                params: "",
                order: 1,
                columns: 1
            }
        }));
    }, 1000);
});

function getDomain() {
    return (port && port != 80) ? "localhost:" + port : "localhost";
}

app.listen(port);