/**
 * Created by justin on 3/13/15.
 */
app.registerDirective(function (container) {
    var AccountDetailWidgetWrapperController = container.getController("controllers/accountDetails/AccountDetailWidgetWrapperController");

    function AccountDetailWidgetWrapperDirective() {
        return {
            restrict: "EA",
            controller: AccountDetailWidgetWrapperController,
            scope: {
                title: "@",
                bodyClass: "@",
                eventBusChannel: "="
            },
            transclude: true,
            templateUrl: "templates/accountDetails/directives/widgetWrapper.html"
        };
    }

    return AccountDetailWidgetWrapperDirective;
});