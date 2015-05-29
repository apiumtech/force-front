define([
    'app',
    'modules/saleAnalytics/distribution/DistributionView'
], function (app, DistributionView) {
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

        var scope;
        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
        }));
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