define([
    'app',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxView',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxController',
    'angular'
], function(app, ReportSearchBoxView, ReportSearchBoxController, angular){
    'use strict';

    describe("ReportSearchBoxController", function () {
            var appName = app.name;
            beforeEach(module(appName));

            var $controller;
            var scope;
            var element = angular.element("<div/>");

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('ReportSearchBoxController', {$scope: scope, $element: element});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(ReportSearchBoxController, 'configureView');
                }));
                afterEach(function () {
                    ReportSearchBoxController.configureView.restore();
                });
                it("should call ReportSearchBoxController.configureView global method", function () {
                    new ReportSearchBoxController(scope, element);
                    expect(ReportSearchBoxController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(ReportSearchBoxView);
                beforeEach(function () {
                    sinon.stub(ReportSearchBoxView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    ReportSearchBoxView.newInstance.restore();
                });
                it("should create new instance of ReportSearchBoxView", function () {
                    ReportSearchBoxController.configureView(scope, element);
                    expect(ReportSearchBoxView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });
});