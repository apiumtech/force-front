define([
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarPresenter',
    'shared/services/FullCalendarService',
    'angular'
], function(AgendaCalendarView, AgendaCalendarPresenter, FullCalendarService, angular) {
    'use strict';

    describe('AgendaCalendarView Test', function() {
        var sut, calendarService, element, presenter, scope;
        beforeEach(function(){
            presenter = mock(AgendaCalendarPresenter);
            calendarService = mock(FullCalendarService);
            element = angular.element("<div class='agenda-calendar'><div id='agenda-calendar'></div></div>");
            inject(function($rootScope){
                scope = $rootScope.$new();
            });

            AgendaCalendarView.prototype.eventBusChannel = {
                onReloadCommandReceived: sinon.stub()
            };

            sut = new AgendaCalendarView(scope, element, presenter, calendarService);

        });

        describe('Constructor', function(){
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
        
    });
});