define([
    'app',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetView',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetController',
    'angular'
], function (app, GraphChartWidgetView, GraphChartWidgetController, angular) {
    'use strict';

    describe("GraphChartWidgetController", function () {
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
                sinon.stub(GraphChartWidgetController, 'configureView');
            }));
            afterEach(function () {
                GraphChartWidgetController.configureView.restore();
            });
            it("should call GraphChartWidgetController.configureView global method", function () {
                new GraphChartWidgetController(scope, element);
                expect(GraphChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(GraphChartWidgetView);
            beforeEach(function () {
                sinon.stub(GraphChartWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                GraphChartWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                GraphChartWidgetController.configureView(scope, element);
                expect(GraphChartWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});