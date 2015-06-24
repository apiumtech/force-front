define([
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarModel'
], function (AgendaCalendarModel) {
    'use strict';

    function AgendaCalendarPresenter(model) {
        this.model = model || new AgendaCalendarModel();
    }

    AgendaCalendarPresenter.prototype.show = function(view) {
        var self = this;
        self.view = view;
        var model = self.model;

        view.event = {};

        view.event.onLoadEvents = function(){
            model.loadEvents().then(view.onEventsLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onDeleteEvent = function(event){
            model.deleteEvent(event).then(view.onEventDeleted.bind(view), view.showError.bind(view));
        };

    };

    return AgendaCalendarPresenter;
});