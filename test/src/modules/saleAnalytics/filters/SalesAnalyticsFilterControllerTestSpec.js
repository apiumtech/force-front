/**
 * Created by justin on 2/3/15.
 */
define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController'
], function (app, SalesAnalyticsFilterView, SalesAnalyticsFilterController) {
    'use strict';
    var appName = app.name;
    beforeEach(module(appName));
    describe("SalesAnalyticsFilterController", function () {

        var $controller;
        var scope;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
        }));

        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('SalesAnalyticsFilterController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe('construct', function () {
            beforeEach(inject(function () {
                sinon.stub(SalesAnalyticsFilterController, 'configureView');
            }));
            afterEach(function () {
                SalesAnalyticsFilterController.configureView.restore();
            });
            it("should call ConversionController.configureView global method", function () {
                new SalesAnalyticsFilterController(scope);
                expect(SalesAnalyticsFilterController.configureView).toHaveBeenCalledWith(scope);
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