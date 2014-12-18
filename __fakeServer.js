/**
 * Created by justin on 12/17/14.
 */
var express = require('express');

var app = express();

app.get('/api/widgets/intensity', function(request, response){
    response.end(JSON.stringify({
        data: [
            {
                url: "123123",
                type: "normal chart"
            },
            {
                url: "123123",
                type: "normal chart"
            }
        ]
    })) ;
});

app.listen(8065);