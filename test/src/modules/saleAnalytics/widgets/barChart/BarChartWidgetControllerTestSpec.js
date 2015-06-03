define([
    'app',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetView',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetController',
    'angular'
], function (app, BarChartWidgetView, BarChartWidgetController, angular) {
    'use strict';

    describe("BarChartWidgetController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope, element;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            element = angular.element("<div />");
        }));

        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(BarChartWidgetController, 'configureView');
            }));
            afterEach(function () {
                BarChartWidgetController.configureView.restore();
            });
            it("should call BarChartWidgetController.configureView global method", function () {
                new BarChartWidgetController(scope, element);
                expect(BarChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(BarChartWidgetView);
            beforeEach(function () {
                sinon.stub(BarChartWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                BarChartWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                BarChartWidgetController.configureView(scope, element);
                expect(BarChartWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});