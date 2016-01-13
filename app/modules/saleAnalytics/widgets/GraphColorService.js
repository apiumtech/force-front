define([], function(){
    'use strict';

    function GraphColorService() {
        this.$colors = [
            '#ed8b00',
            '#86ad20',
            '#ffd632',
            '#00a8be',
            '#226eb4',
            '#aa5b9c',
            '#E70F47',
            '#28BBCE',
            '#3383D4',
            '#FA4C80',
            '#BED62B',
            '#9BAF1D',
            '#7527CF',
            '#AD3253',
            '#67BF74',
            '#FF98BE',
            '#3D8AA7',
            '#F96D36',
            '#805781',
            '#AED581',
            '#90A4AE',
            '#A1887F',
            '#CEAC3A',
            '#566F42',
            '#F04540',
            '#FF5D86'
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