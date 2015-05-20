/**
 * Created by justin on 3/18/15.
 */
define([
    'app',
    'modules/account/widgets/agenda/AgendaWidgetView'
], function (app, AgendaWidgetView) {

    function AgendaWidgetController($scope, $element) {
        AgendaWidgetController.configureView($scope, $element);
    }

    AgendaWidgetController.configureView = function ($scope, $element) {
        this.view = AgendaWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('AgendaWidgetController', ['$scope', '$element', AgendaWidgetController]);

    return AgendaWidgetController;
});