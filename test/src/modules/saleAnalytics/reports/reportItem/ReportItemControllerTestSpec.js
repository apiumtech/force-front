define([
    'app',
    'modules/saleAnalytics/reports/reportItem/ReportItemView',
    'modules/saleAnalytics/reports/reportItem/ReportItemController',
    'angular'
], function (app, ReportItemView, ReportItemController, angular) {
    'use strict';

    describe("ReportItemController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope, element;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            element = angular.element("<div/>");
        }));

        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('ReportItemController', {$scope: scope, $element: element});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(ReportItemController, 'configureView');
            }));
            afterEach(function () {
                ReportItemController.configureView.restore();
            });
            it("should call ReportItemController.configureView global method", function () {
                new ReportItemController(scope, element);
                expect(ReportItemController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(ReportItemView);
            beforeEach(function () {
                sinon.stub(ReportItemView, 'newInstance').returns(view);
            });
            afterEach(function () {
                ReportItemView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                ReportItemController.configureView(scope, element);
                expect(ReportItemView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});