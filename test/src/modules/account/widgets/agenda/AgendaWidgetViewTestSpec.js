/**
 * Created by justin on 3/18/15.
 */

define([
    'modules/account/widgets/agenda/AgendaWidgetView',
    'modules/account/widgets/agenda/AgendaWidgetPresenter',
    'shared/services/ModalDialogAdapter',
    'shared/services/FullCalendarService',
    'angular'
], function (AgendaWidgetView, AgendaWidgetPresenter, ModalDialogAdapter, FullCalendarService, angular) {
    'use strict';
    describe("AgendaWidgetView", function () {

        var sut, presenter, calendarService, $scope, element, modalDialogAdapter;

        beforeEach(function () {

            inject(function($rootScope){
                $scope = $rootScope.$new();
                $scope.$modal = {
                    open: sinon.stub()
                };
            });
            calendarService = mock(FullCalendarService);
            modalDialogAdapter = mock(ModalDialogAdapter);
            presenter = mock(AgendaWidgetPresenter);
            element = angular.element("<div />");
            sut = new AgendaWidgetView($scope, element, presenter, modalDialogAdapter, calendarService);
        });

        describe('Constructor', function () {
            beforeEach(function () {
                sinon.stub(AgendaWidgetView.prototype, "configureEvents");
            });
            afterEach(function () {
                AgendaWidgetView.prototype.configureEvents.restore();
            });
            it('should call configureEvents', function () {
                new AgendaWidgetView($scope, element, presenter, modalDialogAdapter, calendarService);
                expect(AgendaWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {

            beforeEach(function () {
                sut.configureEvents();
            });

            describe('fn.addEvent', function () {
                var promise = {'obj': 123};
                var paramDialog = {
                    result: {
                        then: function (b) {
                            b(promise);
                        }
                    }
                };

                beforeEach(function () {
                    $scope.$modal.open.returns(paramDialog);
                    sut.event.onAddEvent = sinon.stub();
                    sut.fn.addEvent();
                });

                it("should open the dialog", function () {
                    expect($scope.$modal.open).toHaveBeenCalled();
                });

                it("should fire onAddEvent event after dialog dismissed", function () {
                    expect(sut.event.onAddEvent).toHaveBeenCalledWith({'obj': 123});
                });

            });
        });


        describe("onAccountIdChanged", function () {
            it("should call sendReloadCommand if accountId is assigned", function () {
                sut.accountId = 1;
                spyOn(sut.eventChannel, 'sendReloadCommand');
                sut.onAccountIdChanged();
                expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should not call sendReloadCommand if accountId is undefined or null", function () {
                spyOn(sut.eventChannel, 'sendReloadCommand');
                sut.onAccountIdChanged();
                expect(sut.eventChannel.sendReloadCommand).not.toHaveBeenCalled();
            });
        });

        describe("onReloadCommandReceived", function () {
            it("should call loadEvents method", function () {
                spyOn(sut, 'loadEvents');
                sut.onReloadCommandReceived();
                expect(sut.loadEvents).toHaveBeenCalledWith();
            });
        });

        describe('onEventAdded', function () {
            var event = {
                title: "e1",
                start: "12-12-2015"
            };

            beforeEach(function () {
                sut.eventChannel = {
                    sendReloadCommand: sinon.stub()
                };
                sut.onEventAdded(event);
            });

            it('should send a reload command', function () {
                expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should show a notification dialog", function () {
                expect(sut.modalDialogAdapter.notify).toHaveBeenCalled();
            });
        });

        describe('updateCurrentDate', function () {
            beforeEach(function () {
                sut.calendarService.getDate.returns({
                    format: sinon.stub()
                });
                sut.updateCurrentDate();
            });
            it('should call getDate function from calendar service', function () {
                expect(sut.calendarService.getDate).toHaveBeenCalled();
            });
        });

        describe('loadEvents', function () {
            it('should fire onLoadEvents', function () {
                sut.event = {
                    onLoadEvents: sinon.stub()
                };
                sut.loadEvents();
                expect(sut.event.onLoadEvents).toHaveBeenCalled();
            });
        });

        describe('onEventsLoaded', function () {

            var events = [
                {title: "e1", start: "12-12-2015"},
                {title: "e2", start: "24-12-2015"}
            ];

            beforeEach(function () {
                sinon.stub(sut, 'updateCurrentDate');
                sut.eventChannel = {
                    sendReloadCompleteCommand: sinon.stub()
                };
                sut.onEventsLoaded(events);
            });

            it('should send reload complete command', function () {
                expect(sut.eventChannel.sendReloadCompleteCommand).toHaveBeenCalled();
            });
            it('should render the calendar', function () {
                expect(sut.calendarService.render).toHaveBeenCalledWith(events);
            });
            it('should update current date text', function () {
                expect(sut.updateCurrentDate).toHaveBeenCalled();
            });
        });

        describe('onReloadCommandReceived', function () {
            it('should call loadEvents function', function () {
                sinon.stub(sut, 'loadEvents');
                sut.onReloadCommandReceived();
                expect(sut.loadEvents).toHaveBeenCalled();
            });
        });

        describe('onEventDeleted', function () {
            var event = {
                title: "e1",
                start: "12-12-2015"
            };

            beforeEach(function () {
                sut.eventChannel = {
                    sendReloadCommand: sinon.stub()
                };
                sut.onEventDeleted(event);
            });

            it('should send a reload command', function () {
                expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should show a notification dialog", function () {
                expect(sut.modalDialogAdapter.notify).toHaveBeenCalled();
            });

        });

    });

});