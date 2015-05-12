/**
 * Created by justin on 3/18/15.
 */
app.registerController(function (container) {
    var AgendaWidgetView = container.getView("views/accountDetails/AgendaWidgetView");

    function AgendaWidgetController($scope, $element) {
        AgendaWidgetController.configureView($scope, $element);
    }

    AgendaWidgetController.configureView = function ($scope, $element) {
        this.view = AgendaWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return AgendaWidgetController;
});