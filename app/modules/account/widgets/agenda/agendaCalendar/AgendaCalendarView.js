define([
    'shared/BaseView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarPresenter',
    'shared/services/FullCalendarService',
    'shared/services/ModalDialogAdapter',
    'moment'
], function (BaseView, AgendaCalendarPresenter, FullCalendarService, ModalDialogAdapter, moment) {
    'use strict';

    function AgendaCalendarView($scope, $element, presenter, calendarService, modalAdapter) {
        presenter = presenter || new AgendaCalendarPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.element = $element;
        this.calendarService = calendarService || new FullCalendarService();
        this.selectedView = 'month';
        this.modalDialogAdapter = modalAdapter || ModalDialogAdapter.newInstance($scope.$modal);
        this.moment = moment;
        this.configureEvents(this);
    }

    AgendaCalendarView.inherits(BaseView, {
        selectedView: {
            get: function () {
                return this.$scope.selectedView;
            },
            set: function (value) {
                this.$scope.selectedView = value;
            }
        },
        currentDate: {
            get: function () {
                return this.$scope.currentDate;
            },
            set: function (value) {
                this.$scope.currentDate = value;
            }
        },
        selectedEvent: {
            get: function () {
                return this.$scope.selectedEvent;
            },
            set: function (value) {
                this.$scope.selectedEvent = value;
            }
        },
        eventBusChannel: {
            get: function () {
                return this.$scope.eventBusChannel;
            },
            set: function (value) {
                this.$scope.eventBusChannel = value;
            }
        }
    });

    AgendaCalendarView.prototype.configureEvents = function () {

        var self = this;

        self.fn.initCalendar = function () {
            var calendar = self.element.find("#agenda-calendar");
            self.calendarService.initCalendar(calendar, true, true, 450);
            self.loadEvents();
        };

        self.fn.changeView = function () {
            self.calendarService.changeView(self.selectedView);
            self.updateCurrentDate();
        };

        self.fn.prev = function () {
            self.calendarService.prev();
            self.updateCurrentDate();
        };

        self.fn.next = function () {
            self.calendarService.next();
            self.updateCurrentDate();
        };

        self.fn.deleteEvent = function (event, title, message) {
            title = title || "Delete event";
            message = message || "Are you sure want to delete the event <b>" + event.title + "</b>?";
            self.modalDialogAdapter.confirm(title,
                message,
                self.event.onDeleteEvent.bind(self, event),
                doNothing,
                "Accept", "No, thanks");
        };

        $(document).bind('click', self.handleClickEvent.bind(self));

        self.eventBusChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

    };

    AgendaCalendarView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadEvents();
    };

    AgendaCalendarView.prototype.onEventDeleted = function(event){
        var self = this;
        self.eventBusChannel.sendReloadCommand();
        var message = self.generateSuccessMessage("Event " + event.title + " has been deleted successfully");
        self.modalDialogAdapter.notify('', message);
    };

    AgendaCalendarView.prototype.handleClickEvent = function (event) {
        var self = this;
        $('#tooltip').hide();
        var target = $(event.target);
        var parents = target.parents();
        var expectedParent = null;
        for (var i = 0; i < parents.length; i++) {
            var p = parents[i];
            if ($(p).hasClass('agenda-event')) {
                expectedParent  = p;
                break;
            }
        };
        if (!expectedParent) return;
        self.selectEvent($(expectedParent).data('eventData'), target);
    };

    AgendaCalendarView.prototype.selectEvent = function(event, eventElement){
        var self = this;
        var position = eventElement.offset();
        var time = moment(event.start).format('MMMM Do YYYY, HH:mm');
        time += " - ";
        time += moment(event.end).format('HH:mm');

        self.selectedEvent = event;
        self.selectedEvent.time = time;

        $('#tooltip').css({
            top: position.top,
            left: position.left + 35
        }).appendTo("body").fadeIn(200);

        $('#tooltip').show();
    };

    AgendaCalendarView.prototype.updateCurrentDate = function () {
        var self = this;
        var moment = self.calendarService.getDate();
        switch (self.selectedView) {
            case 'agendaDay':
                self.currentDate = moment.format('MMMM Do YYYY');
                break;
            case 'agendaWeek':
                self.currentDate = moment.startOf('week').format('MMMM Do YYYY') + " - " + moment.endOf('week').format('MMMM Do YYYY');
                break;
            default:
                self.currentDate = moment.format('MMMM YYYY');
                break;
        }

        console.log("current date", self.currentDate);
    };

    AgendaCalendarView.prototype.loadEvents = function () {
        var self = this;
        console.log("start loading");
        self.event.onLoadEvents();
    };

    AgendaCalendarView.prototype.onEventsLoaded = function (events) {
        var self = this;
        console.log("finished loading");
        self.eventBusChannel.sendReloadCompleteCommand();
        self.calendarService.setEvents(events);
        self.calendarService.render();
        self.updateCurrentDate();
    };

    AgendaCalendarView.newInstance = function ($scope, $element, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new AgendaCalendarView($scope, $element, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AgendaCalendarView;
});