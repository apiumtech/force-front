/**
 * Created by justin on 3/13/15.
 */
app.registerDirective(function (container) {
    var activityWidgetController = container.getController('controllers/accountDetails/ActivityWidgetController');

    function AccountDetailActivityDirective() {
        return {
            restrict: "EA",
            controller: activityWidgetController,
            scope: {
                accountId: "="
            },
            templateUrl: "templates/accountDetails/directives/activityWidget.html"
        };

    }

    return AccountDetailActivityDirective;
});