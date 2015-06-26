define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetView',
    'modules/saleAnalytics/widgets/custom/CustomWidgetController'
], function (app, CustomWidgetView, CustomWidgetController) {
    'use strict';

    describe("CustomWidgetController", function () {
        it('should instantiate view passing scope, element and compile', function () {
            var scope = "scope";
            var element = "element";
            var compile = "compile";
            spyOn(CustomWidgetController, "configureView");
            var sut = new CustomWidgetController(scope, element, compile);
            expect(CustomWidgetController.configureView).toHaveBeenCalledWith(scope, element, compile);
        });
        it("should call view's show method on instantiation", function () {
            var view = {
                show: jasmine.createSpy()
            };
            spyOn(CustomWidgetView, "newInstance").and.returnValue(view);
            var sut = new CustomWidgetController();
            expect(view.show).toHaveBeenCalled();
        });
    });
});