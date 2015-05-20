/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/opportunity/OpportunityWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, OpportunityWidgetController) {

    function AccountDetailOpportunityDirective() {
        return {
            restrict: "EA",
            controller: OpportunityWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/opportunity/opportunityWidget.html"
        };
    }

    app.register.directive('accountDetailOpportunity', [AccountDetailOpportunityDirective]);

    return AccountDetailOpportunityDirective;
});