/**
 * Created by Justin on 2/11/2015.
 */
define([
    'jquery',
    'moment'
], function ($, moment) {

    function FullCalendarService() {

    }

    FullCalendarService.prototype.initCalendar = function (element, hideHeader, useTheme, height) {
        var self = this;
        self.element = element;
        self.options = {
            selectable: true,
            dayClick: function (date) {
                self.setCurrentDate(date);
            },
        };
        if (height) self.options.height = height;
        self.options.theme = useTheme;
        if (hideHeader) {
            self.options.header = {
                left: '',
                center: '',
                right: ''
            };
        }
    };

    FullCalendarService.prototype.render = function (events) {
        var self = this;
        //self.options.events = events;
        self.options.eventRender = self.renderEvent;
        $(self.element).fullCalendar(self.options);
        $(self.element).fullCalendar('removeEvents');
        $(self.element).fullCalendar('addEventSource', events);
    };

    FullCalendarService.prototype.changeView = function (viewName) {
        var self = this;
        $(self.element).fullCalendar('changeView', viewName);
    };

    FullCalendarService.prototype.prev = function () {
        var self = this;
        $(self.element).fullCalendar('prev');
    };

    FullCalendarService.prototype.next = function () {
        var self = this;
        $(self.element).fullCalendar('next');
    };

    FullCalendarService.prototype.getDate = function () {
        var self = this;
        return $(self.element).fullCalendar('getDate');
    };

    FullCalendarService.prototype.setCurrentDate = function (date) {
        var self = this;
        $(self.element).fullCalendar('gotoDate', date);
    };

    FullCalendarService.prototype.setEvents = function (events) {
        var self = this;
        self.options.events = events;
        self.options.eventRender = self.renderEvent;
    };

    FullCalendarService.prototype.renderEvent = function (event, element) {
        var self = this;

        $(element).data('eventData', event);

        $(element).addClass("agenda-event");

        switch (event.type) {
            case 'event':
                $(element).addClass("event-element");
                break;
            case 'task':
                $(element).addClass("task-element");
                break;
            default:
                $(element).addClass("default-element");
                break;
        }
    };


    return FullCalendarService;
});