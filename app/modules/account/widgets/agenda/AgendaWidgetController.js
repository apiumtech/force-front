/**
 * Created by justin on 3/18/15.
 */
define([
    'app',
    'modules/account/widgets/agenda/AgendaWidgetView',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarDirective',
    'modules/account/widgets/agenda/addEventDialog/AddEventDialogController'
], function (app, AgendaWidgetView) {

    function AgendaWidgetController($scope, $element, $modal) {
        $scope.$modal = $modal;
        AgendaWidgetController.configureView($scope, $element);
    }

    AgendaWidgetController.configureView = function ($scope, $element) {
        this.view = AgendaWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('AgendaWidgetController', ['$scope', '$element', '$modal', AgendaWidgetController]);

    return AgendaWidgetController;
});