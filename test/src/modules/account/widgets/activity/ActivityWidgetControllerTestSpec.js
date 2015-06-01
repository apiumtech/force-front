/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/widgets/activity/ActivityWidgetView',
    'modules/account/widgets/activity/ActivityWidgetController',
    'angular'
], function (app, ActivityWidgetView, ActivityWidgetController, angular) {
    'use strict';
    describe("ActivityWidgetController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("ActivityWidgetController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('ActivityWidgetController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(ActivityWidgetController, 'configureView');
                }));
                afterEach(function () {
                    ActivityWidgetController.configureView.restore();
                });
                it("should call ActivityWidgetController.configureView global method", function () {
                    new ActivityWidgetController(scope, element);
                    expect(ActivityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(ActivityWidgetView);
                beforeEach(function () {
                    sinon.stub(ActivityWidgetView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    ActivityWidgetView.newInstance.restore();
                });
                it("should create new instance of ActivityWidgetView", function () {
                    ActivityWidgetController.configureView(scope, element);
                    expect(ActivityWidgetView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });
});