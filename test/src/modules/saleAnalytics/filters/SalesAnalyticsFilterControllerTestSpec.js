/**
 * Created by justin on 2/3/15.
 */
define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController'
], function (app, SalesAnalyticsFilterView, SalesAnalyticsFilterController) {
    'use strict';

    describe("SalesAnalyticsFilterController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            scope.i18nextLanguageReady = false;
        }));

        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('SalesAnalyticsFilterController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("configureView", function () {
            var view = mock(SalesAnalyticsFilterView);
            beforeEach(function () {
                sinon.stub(SalesAnalyticsFilterView, 'newInstance').returns(view);
            });
            afterEach(function () {
                SalesAnalyticsFilterView.newInstance.restore();
            });
            it("should create new instance of ConversionView", function () {
                SalesAnalyticsFilterController.configureView(scope);
                expect(SalesAnalyticsFilterView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });

    });

});
