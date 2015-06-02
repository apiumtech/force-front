define([
    'app',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogView',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogController',
], function (app, PreviewDialogView, PreviewDialogController) {
    'use strict';

    describe("PreviewDialogController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope, report, $modalInstance;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            report = {};
            $modalInstance = {};
        }));
        describe("loading asynchronously", function () {

            beforeEach(inject(function () {
                sinon.stub(PreviewDialogController, 'configureView');
            }));
            afterEach(function () {
                PreviewDialogController.configureView.restore();
            });
            it("should register the controller to app", function () {
                var ctrl = $controller('PreviewDialogController', {
                    $scope: scope,
                    $modalInstance: $modalInstance,
                    report: report
                });
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("construct", function () {

            beforeEach(inject(function () {
                sinon.stub(PreviewDialogController, 'configureView');
            }));
            afterEach(function () {
                PreviewDialogController.configureView.restore();
            });
            it("should call PreviewDialogController.configureView global method", function () {
                new PreviewDialogController(scope, $modalInstance, report);
                expect(scope.report).toEqual(report);
                expect(PreviewDialogController.configureView).toHaveBeenCalledWith(scope, $modalInstance);
            });
        });


        describe("configureView", function () {
            var view = mock(PreviewDialogView);
            beforeEach(function () {
                sinon.stub(PreviewDialogView, 'newInstance').returns(view);
            });
            afterEach(function () {
                PreviewDialogView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                PreviewDialogController.configureView(scope, $modalInstance);
                expect(PreviewDialogView.newInstance).toHaveBeenCalledWith(scope, $modalInstance);
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});