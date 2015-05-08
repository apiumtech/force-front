/**
 * Created by justin on 3/13/15.
 */
app.registerDirective(function (container) {
    var WidgetWrapperController = container.getController("controllers/widgets/WidgetWrapperController");

    function WidgetWrapperDirective() {
        return {
            restrict: "EA",
            controller: WidgetWrapperController,
            scope: {
                title: "@",
                bodyClass: "@",
                eventBusChannel: "=",
                foreverScroll: "&"
            },
            transclude: true,
            templateUrl: "templates/accountDetails/directives/widgetWrapper.html"
        };
    }

    return WidgetWrapperDirective;
});