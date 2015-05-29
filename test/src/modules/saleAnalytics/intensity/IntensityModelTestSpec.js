/**
 * Created by Justin on 1/5/2015.
 */
define([
    'modules/saleAnalytics/intensity/IntensityModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (IntensityModel, WidgetService, StorageService) {
    'use strict';

    describe("IntensityModel", function () {
        var sut,
            widgetService = mock(WidgetService),
            storageService = mock(StorageService);

        beforeEach(function () {
            sut = new IntensityModel(widgetService, storageService);
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
            it("should be 'intensity'", function () {
                expect(sut.pageName).toEqual('intensity');
            });
        });

        describe("_getWidgets", function () {
            it("should call getWidgetsForPage from service", function () {
                spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakeAjax());
                sut._getWidgets();
                expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith('intensity');
            });
        });
    });
});