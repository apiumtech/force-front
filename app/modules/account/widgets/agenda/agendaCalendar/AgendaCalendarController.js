define([
    'app',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarView'
], function (app, AgendaCalendarView) {
    'use strict';

    function AgendaCalendarController($scope, $element, $modal) {
        $scope.$modal = $modal;
        AgendaCalendarController.configureView($scope, $element);
    }

    AgendaCalendarController.configureView = function ($scope, $element) {
        this.view = AgendaCalendarView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('AgendaCalendarController', ['$scope', '$element', '$modal', AgendaCalendarController]);

    return AgendaCalendarController;
});