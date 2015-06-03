/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/widgets/opportunity/OpportunityWidgetView',
    'modules/account/widgets/opportunity/OpportunityWidgetController',
    'angular'
], function (app, OpportunityWidgetView, OpportunityWidgetController, angular) {
    'use strict';
    describe("OpportunityWidgetController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("OpportunityWidgetController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('OpportunityWidgetController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(OpportunityWidgetController, 'configureView');
                }));
                afterEach(function () {
                    OpportunityWidgetController.configureView.restore();
                });
                it("should call OpportunityWidgetController.configureView global method", function () {
                    new OpportunityWidgetController(scope, element);
                    expect(OpportunityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(OpportunityWidgetView);
                beforeEach(function () {
                    sinon.stub(OpportunityWidgetView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    OpportunityWidgetView.newInstance.restore();
                });
                it("should create new instance of OpportunityWidgetView", function () {
                    OpportunityWidgetController.configureView(scope, element);
                    expect(OpportunityWidgetView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });

});