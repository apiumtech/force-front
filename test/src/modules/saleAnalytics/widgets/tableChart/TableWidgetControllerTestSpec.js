define([
    'app',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetView',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetController',
    'angular'
], function (app, TableWidgetView, TableWidgetController, angular) {
    'use strict';

    describe("TableWidgetController", function () {
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
                sinon.stub(TableWidgetController, 'configureView');
            }));
            afterEach(function () {
                TableWidgetController.configureView.restore();
            });
            it("should call TableWidgetController.configureView global method", function () {
                new TableWidgetController(scope, element);
                expect(TableWidgetController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(TableWidgetView);
            beforeEach(function () {
                sinon.stub(TableWidgetView, 'newInstance').returns(view);
            });
            afterEach(function () {
                TableWidgetView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                TableWidgetController.configureView(scope, element);
                expect(TableWidgetView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});