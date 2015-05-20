/**
 * Created by justin on 3/18/15.
 */
app.registerDirective(function (container) {
    var AgendaWidgetController = container.getController('controllers/accountDetails/AgendaWidgetController');

    function AccountDetailActivityDirective() {
        return {
            restrict: "EA",
            controller: AgendaWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "templates/accountDetails/directives/agendaWidget.html"
        };
    }

    return AccountDetailActivityDirective;
});