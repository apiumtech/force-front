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
                ajax: jasmine.createSpy()
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
                sut.getWidgetsForPage(pageName);
                expect(ajaxService.ajax).toHaveBeenCalled();
                expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual('/api/widgets/' + pageName);
            });
        });

        describe("updatePageWidgets", function () {
            it("should call ajax from its ajaxService with correct params", function () {
                var updateData = {};
                sut.updatePageWidgets(updateData);
                expect(ajaxService.ajax).toHaveBeenCalled();
                expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual('/api/widgets');
                expect(ajaxService.ajax.calls.mostRecent().args[0].type.toLowerCase()).toEqual('put');
                expect(ajaxService.ajax.calls.mostRecent().args[0].data).toEqual(updateData);
            });
        });
    });

});