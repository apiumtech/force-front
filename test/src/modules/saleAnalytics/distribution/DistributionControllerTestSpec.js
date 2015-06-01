define([
    'app',
    'modules/saleAnalytics/distribution/DistributionView',
    'modules/saleAnalytics/distribution/DistributionController'
], function (app, DistributionView, DistributionController) {
    'use strict';

    describe("DistributionController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
        }));

        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('DistributionController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(DistributionController, 'configureView');
            }));
            afterEach(function () {
                DistributionController.configureView.restore();
            });
            it("should call DistributionController.configureView global method", function () {
                new DistributionController(scope);
                expect(DistributionController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(DistributionView);
            beforeEach(function () {
                sinon.stub(DistributionView, 'newInstance').returns(view);
            });
            afterEach(function () {
                DistributionView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                DistributionController.configureView(scope);
                expect(DistributionView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});