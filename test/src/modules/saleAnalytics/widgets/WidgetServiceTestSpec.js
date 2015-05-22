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
                rawAjaxRequest: jasmine.createSpy()
            };
            sut = WidgetService.newInstance(ajaxService);
        });

        describe("getWidgetsForPage", function () {
            it("should throw exception if page name is not defined", function () {
                expect(function () {
                    sut.getWidgetsForPage();
                }).toThrow(new Error("Page name cannot be null"));
            });

            it("should call ajax from its ajaxService with correct fetch url", function () {
                var pageName = "ABC";

                //TODO: update when having real API
                sut.getWidgetsForPage(pageName);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            });
        });

        describe("updatePageWidgets", function () {
            it("should call ajax from its ajaxService with correct params", function () {
                //TODO: update when having real API
                var updateData = {};
                sut.updatePageWidgets(updateData);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            });
        });
    });

});