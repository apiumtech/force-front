define([
    'app',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarController',
    'angular'
], function(app, AgendaCalendarView, AgendaCalendarController, angular){
    'use strict';

    describe("AgendaCalendarController", function () {
            var appName = app.name;
            beforeEach(module(appName));

            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AgendaCalendarController', {$scope: scope, $element: element});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AgendaCalendarController, 'configureView');
                }));
                afterEach(function () {
                    AgendaCalendarController.configureView.restore();
                });
                it("should call AgendaCalendarController.configureView global method", function () {
                    new AgendaCalendarController(scope, element);
                    expect(AgendaCalendarController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(AgendaCalendarView);
                beforeEach(function () {
                    sinon.stub(AgendaCalendarView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AgendaCalendarView.newInstance.restore();
                });
                it("should create new instance of AgendaCalendarView", function () {
                    AgendaCalendarController.configureView(scope, element);
                    expect(AgendaCalendarView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });
});