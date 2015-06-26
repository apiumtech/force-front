define([
    'core/topMenu/TopMenuWeb3View'
], function (TopMenuWeb3View) {
    'use strict';

    function exerciseCreateView(){
        return TopMenuWeb3View.newInstance({}, {}, {}, false, false);
    };

    describe("TopMenuWeb3View", function () {
        it('should configureEvents on instantiation', function () {
            spyOn(TopMenuWeb3View.prototype, "configureEvents");
            var sut = exerciseCreateView();
            expect(sut.configureEvents).toHaveBeenCalled();
        });
        describe("getMenuTemplateName", function () {
            it('should return web3 template name', function () {
                var sut = exerciseCreateView();
                expect(sut.getMenuTemplateName()).toBe("topMenuWeb3");
            });
        });
    });

});