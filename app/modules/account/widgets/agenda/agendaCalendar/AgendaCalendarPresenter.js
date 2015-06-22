define([
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarModel'
], function (AgendaCalendarModel) {
    'use strict';

    function AgendaCalendarPresenter(model) {
        this.model = model || new AgendaCalendarModel();
    }

    AgendaCalendarPresenter.prototype.show = function(view) {

    };

    return AgendaCalendarPresenter;
});