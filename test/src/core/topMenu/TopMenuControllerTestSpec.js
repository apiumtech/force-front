define([
    'core/topMenu/TopMenuController',
    'core/topMenu/TopMenuView'
], function (TopMenuController, TopMenuView) {
    'use strict';


    describe("TopMenuController", function(){

        var scope, win;
        function exerciseCreateController(){
            scope = {};
            win = document.window;
            new TopMenuController(scope, win);
        }

        it("should call configureView static method on instantiation", function () {
            spyOn(TopMenuController, "configureView");
            exerciseCreateController();
            expect(TopMenuController.configureView).toHaveBeenCalledWith(scope, win);
        });

        it("should call view's show method on instantiation", function () {
            var viewMock = {
                show: jasmine.createSpy()
            };
            spyOn(TopMenuView, "newInstance").and.returnValue(viewMock);
            exerciseCreateController();
            expect(viewMock.show).toHaveBeenCalled();
        });

    });
});