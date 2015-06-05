/**
 * Created by justin on 3/18/15.
 */
define([
    'app',
    'modules/account/widgets/analytic/AnalyticWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, AnalyticWidgetController) {

    function AccountAnalyticWidgetDirective() {
        return {
            restrict: "EA",
            controller: AnalyticWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/analytic/analyticWidget.html"
        };
    }

    app.register.directive('accountDetailAnalytic', [AccountAnalyticWidgetDirective]);

    return AccountAnalyticWidgetDirective;
});