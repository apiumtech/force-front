define([
    'app',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetView',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetController',
    'angular'
], function (app, ScatterChartWidgetView, ScatterChartWidgetController, angular) {
    'use strict';

    describe("ScatterChartWidgetController", function () {
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
                sinon.stub(ScatterChartWidgetController, 'configureView');
            }));
            afterEach(function () {
                ScatterChartWidgetController.configureView.restore();
            });
            it("should call ScatterChartWidgetController.configureView global method", function () {
                new ScatterChartWidgetController(scope, element);
                expect(ScatterChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(ScatterChartWidgetView);
            beforeEach(function () {
                sinon.stub(ScatterChartWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                ScatterChartWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                ScatterChartWidgetController.configureView(scope, element);
                expect(ScatterChartWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});