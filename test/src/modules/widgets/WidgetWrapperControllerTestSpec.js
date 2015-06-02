define([
    'app',
    'modules/widgets/WidgetWrapperView',
    'modules/widgets/WidgetWrapperController',
    'angular'
], function (app, WidgetWrapperView, WidgetWrapperController, angular) {
    'use strict';

    describe("WidgetWrapperController", function () {
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
                sinon.stub(WidgetWrapperController, 'configureView');
            }));
            afterEach(function () {
                WidgetWrapperController.configureView.restore();
            });
            it("should call WidgetWrapperController.configureView global method", function () {
                new WidgetWrapperController(scope, element);
                expect(WidgetWrapperController.configureView).toHaveBeenCalledWith(scope, element);
            });
        });


        describe("configureView", function () {
            var view = mock(WidgetWrapperView);
            beforeEach(function () {
                sinon.stub(WidgetWrapperView, 'newInstance').returns(view);
            });
            afterEach(function () {
                WidgetWrapperView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                WidgetWrapperController.configureView(scope, element);
                expect(WidgetWrapperView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});