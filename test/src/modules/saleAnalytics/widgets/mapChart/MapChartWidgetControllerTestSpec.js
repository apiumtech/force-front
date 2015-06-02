define([
    'app',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetView',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetController',
    'angular'
], function (app, MapChartWidgetView, MapChartWidgetController, angular) {
    'use strict';

    describe("MapChartWidgetController", function () {
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
                sinon.stub(MapChartWidgetController, 'configureView');
            }));
            afterEach(function () {
                MapChartWidgetController.configureView.restore();
            });
            it("should call MapChartWidgetController.configureView global method", function () {
                new MapChartWidgetController(scope, element);
                expect(MapChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(MapChartWidgetView);
            beforeEach(function () {
                sinon.stub(MapChartWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                MapChartWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                MapChartWidgetController.configureView(scope, element);
                expect(MapChartWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});