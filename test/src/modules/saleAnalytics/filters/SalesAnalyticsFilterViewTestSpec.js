define([
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView'
], function (SalesAnalyticsFilterView) {
    'use strict';
    describe("SalesAnalyticsFilterView", function () {

        var sut, $scope;

        beforeEach(function () {
            $scope = mockAngularScope();
            sut = new SalesAnalyticsFilterView($scope);
        });

        describe("__construct()", function () {

            it("should call configureEvents static method", function () {
                spyOn(SalesAnalyticsFilterView, 'configureEvents').and.callThrough();
                var _sut = new SalesAnalyticsFilterView($scope);
                expect(SalesAnalyticsFilterView.configureEvents).toHaveBeenCalledWith(_sut);
            });
        });
    });

});
