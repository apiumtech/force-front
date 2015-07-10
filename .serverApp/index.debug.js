'use strict';

var expressConfig = require('./expressConfig');

var app = expressConfig();

module.exports = app;

app.listen(10801);