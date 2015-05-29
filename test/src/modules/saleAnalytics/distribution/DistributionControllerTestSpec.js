define([
    'app'
], function (app) {
    'use strict';

    describe("DistributionController", function () {
        var DistributionController;
        describe("loading asynchronously", function () {
            beforeEach(function (done) {
                sinon.stub(app.register, 'controller');

                require(['modules/saleAnalytics/distribution/DistributionController'], function (DC) {
                    DistributionController = DC;
                    done();
                });
            });
            afterEach(function () {
                app.register.controller.restore();
            });
            it("should register the controller to app", function () {
                expect(app.register.controller).toHaveBeenCalledWith('DistributionController', ['$scope', DistributionController]);
            });
        });

        describe("construct", function () {
            var scope;
            beforeEach(inject(function (_$rootScope_) {
                scope = _$rootScope_.$new();
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
    });
});