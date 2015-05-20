/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/activity/ActivityWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, ActivityWidgetController) {

    function AccountDetailActivityDirective() {
        return {
            restrict: "EA",
            controller: ActivityWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/activity/activityWidget.html"
        };
    }

    app.register.directive('accountDetailActivity', [AccountDetailActivityDirective]);

    return AccountDetailActivityDirective;
});