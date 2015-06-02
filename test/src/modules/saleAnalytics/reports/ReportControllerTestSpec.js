define([
    'app',
    'modules/saleAnalytics/reports/ReportView',
    'modules/saleAnalytics/reports/ReportController'
], function (app, ReportView, ReportController) {
    'use strict';

    describe("ReportController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope, modal;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$modal_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            modal = _$modal_;
        }));

        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('ReportController', {$scope: scope, $modal: modal});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("construct", function () {
            beforeEach(function () {
                sinon.stub(ReportController, 'configureView');
            });
            afterEach(function () {
                ReportController.configureView.restore();
            });
            it("should call ReportController.configureView global method", function () {
                new ReportController(scope, modal);
                expect(ReportController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(ReportView);
            beforeEach(function () {
                sinon.stub(ReportView, 'newInstance').returns(view);
            });
            afterEach(function () {
                ReportView.newInstance.restore();
            });
            it("should create new instance of ReportView", function () {
                ReportController.configureView(scope);
                expect(ReportView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});