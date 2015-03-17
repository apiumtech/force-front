/**
 * Created by justin on 3/13/15.
 */
app.registerDirective(function (container) {
    var OpportunityWidgetController = container.getController('controllers/accountDetails/OpportunityWidgetController');

    function AccountDetailActivityDirective() {
        return {
            restrict: "EA",
            controller: OpportunityWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "templates/accountDetails/directives/opportunityWidget.html"
        };
    }

    return AccountDetailActivityDirective;
});