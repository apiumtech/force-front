/**
 * Created by Justin on 1/5/2015.
 */
define([
    'modules/saleAnalytics/distribution/DistributionModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (DistributionModel, WidgetService, StorageService) {
    'use strict';
    describe("DistributionModel", function () {
        var sut,
            widgetService = mock(WidgetService),
            storageService = mock(StorageService);

        beforeEach(function () {
            sut = new DistributionModel(widgetService, storageService);
        });
        function fakeAjax() {
            return {
                then: function (a) {
                    a({data: null});
                    return fakeAjax();
                },
                fail: function (a) {
                    a();
                }
            }
        }

        describe("sut.pageName", function () {
            it("should be 'distribution'", function () {
                expect(sut.pageName).toEqual('distribution');
            });
        });

        describe("_getWidgets", function () {
            it("should call getWidgetsForPage from service", function () {
                spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakeAjax());
                sut._getWidgets();
                expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith(sut.pageName);
            });
        });
    });

});