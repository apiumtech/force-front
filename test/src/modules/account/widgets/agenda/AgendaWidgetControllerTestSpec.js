/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/widgets/agenda/AgendaWidgetView',
    'modules/account/widgets/agenda/AgendaWidgetController',
    'angular'
], function (app, AgendaWidgetView, AgendaWidgetController, angular) {
    'use strict';
    describe("AgendaWidgetController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("AgendaWidgetController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AgendaWidgetController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AgendaWidgetController, 'configureView');
                }));
                afterEach(function () {
                    AgendaWidgetController.configureView.restore();
                });
                it("should call AgendaWidgetController.configureView global method", function () {
                    new AgendaWidgetController(scope, element);
                    expect(AgendaWidgetController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(AgendaWidgetView);
                beforeEach(function () {
                    sinon.stub(AgendaWidgetView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AgendaWidgetView.newInstance.restore();
                });
                it("should create new instance of AgendaWidgetView", function () {
                    AgendaWidgetController.configureView(scope, element);
                    expect(AgendaWidgetView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });
});