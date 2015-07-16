define([
    'modules/saleAnalytics/widgets/GraphColorService'
], function(GraphColorService) {
    'use strict';

    describe('GraphColorService Test', function() {
        var sut;
        beforeEach(function(){
            sut = new GraphColorService();
            sut.$colors = [0,1,2,3,4,5,6];
            sut.colors = [0,1,2,3,4,5,6];
        });

        describe('getNextColor', function(){
            it('should return the first color the first time', function () {
                expect(sut.getNextColor()).toBe(0);
            });
            it('should return the third color the third time', function () {
                sut.getNextColor();
                sut.getNextColor();
                sut.getNextColor();
                expect(sut.getNextColor()).toBe(3);
            });
        });

        describe("initialize", function () {
            it("should set the colors on its initial state", function () {
                sut.initialize();
                expect(sut.getNextColor()).toBe(0);
            });
        });
    });
});