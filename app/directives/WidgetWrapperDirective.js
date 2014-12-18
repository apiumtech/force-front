/**
 * Created by justin on 12/18/14.
 */
app.registerDirective(function (container) {
    var widgetWrapperController = container.getController("controllers/WidgetWrapperController");

    function WidgetDirective() {
        return {
            restrict: "EA",
            controller: widgetWrapperController,
            // controllerAs: 'widgetWrapper', // FIXME (Justin): Do we need this some case ?
            scope: {
                title: "@"
            },
            transclude: true,
            templateUrl: "templates/directives/widgetWrapper.html"
        };
    }

    return WidgetDirective;
});