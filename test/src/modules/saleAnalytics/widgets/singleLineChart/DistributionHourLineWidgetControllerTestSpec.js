define([
    'app',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetView',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetController',
    'angular'
], function (app, DistributionHourLineWidgetView, DistributionHourLineWidgetController, angular) {
    'use strict';

    describe("DistributionHourLineWidgetController", function () {
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
                sinon.stub(DistributionHourLineWidgetController, 'configureView');
            }));
            afterEach(function () {
                DistributionHourLineWidgetController.configureView.restore();
            });
            it("should call DistributionHourLineWidgetController.configureView global method", function () {
                new DistributionHourLineWidgetController(scope, element);
                expect(DistributionHourLineWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(DistributionHourLineWidgetView);
            beforeEach(function () {
                sinon.stub(DistributionHourLineWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                DistributionHourLineWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                DistributionHourLineWidgetController.configureView(scope, element);
                expect(DistributionHourLineWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});