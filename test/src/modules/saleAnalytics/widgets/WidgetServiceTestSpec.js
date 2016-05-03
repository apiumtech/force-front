/**
 * Created by Justin on 1/5/2015.
 */
define([
    'modules/saleAnalytics/widgets/WidgetService'
], function (WidgetService) {
    'use strict';
    describe("WidgetService", function () {

        var sut,
            ajaxService;

        beforeEach(function () {
            ajaxService = {
                ajax: jasmine.createSpy(),
                rawAjaxRequest: jasmine.createSpy().and.returnValue(exerciseFakePromise())
            };
            sut = WidgetService.newInstance(ajaxService);
        });

        describe("getWidgetsForPage", function () {
            it("should throw exception if page name is not defined", function () {
                expect(function () {
                    sut.getWidgetsForPage();
                }).toThrow(new Error("Page name cannot be null"));
            });
        });
    });

});
