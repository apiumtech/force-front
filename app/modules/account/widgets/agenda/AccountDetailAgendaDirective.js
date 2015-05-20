/**
 * Created by justin on 3/18/15.
 */
define([
    'app',
    'modules/account/widgets/agenda/AgendaWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, AgendaWidgetController) {

    function AccountDetailAgendaDirective() {
        return {
            restrict: "EA",
            controller: AgendaWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/agenda/agendaWidget.html"
        };
    }

    app.register.directive('accountDetailAgenda', [AccountDetailAgendaDirective]);

    return AccountDetailAgendaDirective;
});