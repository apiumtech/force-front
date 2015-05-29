define([
    'app',
    'modules/saleAnalytics/intensity/IntensityView'
], function (app, IntensityView) {
    'use strict';

    describe("IntensityController", function () {
        var IntensityController;
        describe("loading asynchronously", function () {
            beforeEach(function (done) {
                sinon.stub(app.register, 'controller');

                require(['modules/saleAnalytics/intensity/IntensityController'], function (DC) {
                    IntensityController = DC;
                    done();
                });
            });
            afterEach(function () {
                app.register.controller.restore();
            });
            it("should register the controller to app", function () {
                expect(app.register.controller).toHaveBeenCalledWith('IntensityController', ['$scope', IntensityController]);
            });
        });


        var scope;
        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
        }));
        describe("construct", function () {
            var scope;
            beforeEach(inject(function () {
                sinon.stub(IntensityController, 'configureView');
            }));
            afterEach(function () {
                IntensityController.configureView.restore();
            });
            it("should call IntensityController.configureView global method", function () {
                new IntensityController(scope);
                expect(IntensityController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(IntensityView);
            beforeEach(function () {
                sinon.stub(IntensityView, 'newInstance').returns(view);
            });
            afterEach(function () {
                IntensityView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                IntensityController.configureView(scope);
                expect(IntensityView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});