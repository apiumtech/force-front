/**
 * Created by apium on 6/4/15.
 */
define([
    'app',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarController'
], function (app, AgendaCalendarController) {
    'use strict';

    function AgendaCalendarDirective() {

        return {
            restrict: "EA",
            templateUrl: "app/modules/account/widgets/agenda/agendaCalendar/agendaCalendar.html",
            controller: AgendaCalendarController,
            scope: {
                eventBusChannel: "="
            }
        };
    }

    app.register.directive('agendaCalendar', [AgendaCalendarDirective]);

    return AgendaCalendarDirective;
});