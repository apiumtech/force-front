define([
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarPresenter',
    'shared/services/FullCalendarService',
    'shared/services/ModalDialogAdapter',
    'angular'
], function (AgendaCalendarView, AgendaCalendarPresenter, FullCalendarService, ModalDialogAdapter, angular) {
    'use strict';

    describe('AgendaCalendarView Test', function () {
        var sut, calendarService, element, presenter, scope, modalAdapter;
        beforeEach(function () {
            presenter = mock(AgendaCalendarPresenter);
            calendarService = mock(FullCalendarService);
            modalAdapter = mock(ModalDialogAdapter);
            element = angular.element("<div class='agenda-calendar'><div id='agenda-calendar'></div></div>");
            inject(function ($rootScope) {
                scope = $rootScope.$new();
                scope.$modal = {
                    open: sinon.stub()
                };
            });

            AgendaCalendarView.prototype.eventBusChannel = {
                onReloadCommandReceived: sinon.stub()
            };

            sut = new AgendaCalendarView(scope, element, presenter, calendarService, modalAdapter);
            sut.event = {};

        });

        describe('Constructor', function () {
            beforeEach(function () {
                sinon.stub(AgendaCalendarView.prototype, "configureEvents");
            });
            afterEach(function () {
                AgendaCalendarView.prototype.configureEvents.restore();
            });
            it('should call configureEvents', function () {
                new AgendaCalendarView(scope, element, presenter, calendarService);
                expect(AgendaCalendarView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });
            describe('fn.initCalendar', function () {
                var calendar;
                beforeEach(function () {
                    calendar = sut.element.find("#agenda-calendar");
                    sinon.stub(sut, 'loadEvents');
                    sut.fn.initCalendar();
                });
                it('should call initCalendar from calendarService', function () {
                    expect(sut.calendarService.initCalendar).toHaveBeenCalledWith(calendar);
                });
                it('should call loadEvents function', function () {
                    expect(sut.loadEvents).toHaveBeenCalled();
                });
            });

            describe('fn.changeView', function () {
                beforeEach(function () {
                    sut.selectedView = "agendaDay";
                    sinon.stub(sut, 'updateCurrentDate');
                    sut.fn.changeView();
                });
                it('should call changeView method from calendar service', function () {
                    expect(sut.calendarService.changeView).toHaveBeenCalledWith("agendaDay");
                });
                it('should update currentDate text', function () {
                    expect(sut.updateCurrentDate).toHaveBeenCalled();
                });
            });

            describe('fn.prev', function () {
                beforeEach(function () {
                    sinon.stub(sut, 'updateCurrentDate');
                    sut.fn.prev();
                });
                it('should call prev function from calendar service', function () {
                    expect(sut.calendarService.prev).toHaveBeenCalled();
                });
                it('should update currentDate text', function () {
                    expect(sut.updateCurrentDate).toHaveBeenCalled();
                });
            });

            describe('fn.next', function () {
                beforeEach(function () {
                    sinon.stub(sut, 'updateCurrentDate');
                    sut.fn.next();
                });
                it('should call next function from calendar service', function () {
                    expect(sut.calendarService.next).toHaveBeenCalled();
                });
                it('should update currentDate text', function () {
                    expect(sut.updateCurrentDate).toHaveBeenCalled();
                });
            });

            describe('fn.deleteEvent', function () {

                var event = {
                    id: 1,
                    title: "Event title"
                };
                var title = "title";
                var message = "message";

                beforeEach(function () {
                    sut.event.onDeleteEvent = sinon.stub();
                    spyOn(window, 'doNothing');
                });

                it("should call modalDialogAdapter's confirm method", function () {
                    sut.fn.deleteEvent(event, title, message);
                    expect(sut.modalDialogAdapter.confirm).toHaveBeenCalledWith(title, message, jasmine.any(Function), window.doNothing);
                });
                it("should fire onDeleteEvent event when the confirmation confirmed", function () {
                    spyOn(modalAdapter, 'confirm').and.callFake(function (title, message, actionConfirmCallback, actionRejectCallback) {
                        actionConfirmCallback();
                    });
                    sut.fn.deleteEvent(event, title, message);
                    expect(sut.event.onDeleteEvent).toHaveBeenCalled();
                });
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
                sut.eventBusChannel = {
                    sendReloadCompleteCommand: sinon.stub()
                };
                sut.onEventsLoaded(events);
            });

            it('should send reload complete command', function () {
                expect(sut.eventBusChannel.sendReloadCompleteCommand).toHaveBeenCalled();
            });
            it('should assign the loaded events to calendar', function () {
                expect(sut.calendarService.setEvents).toHaveBeenCalledWith(events);
            });
            it('should render the calendar', function () {
                expect(sut.calendarService.render).toHaveBeenCalled();
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
                sut.eventBusChannel = {
                    sendReloadCommand: sinon.stub()
                };
                sut.onEventDeleted(event);
            });

            it('should send a reload command', function () {
                expect(sut.eventBusChannel.sendReloadCommand).toHaveBeenCalled();
            });

            it("should show a notification dialog", function () {
                expect(sut.modalDialogAdapter.notify).toHaveBeenCalled();
            });

        });

    });
});