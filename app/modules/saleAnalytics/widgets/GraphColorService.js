define([], function(){
    'use strict';

    function GraphColorService() {
        this.$colors = [
            '#ed8b00',
            '#86ad20',
            '#ffd632',
            '#00a8be',
            '#226eb4',
            '#aa5b9c'
        ];
        this.initialize();
    }

    GraphColorService.prototype.initialize = function () {
        this.colors = this.$colors.slice();
    };

    GraphColorService.prototype.getNextColor = function () {
        var c = this.colors.shift();
        this.colors.push(c);
        return c;
    };

    return GraphColorService;
});