/**
 * Created by justin on 12/26/14.
 */
app.registerDirective(function(container){
    var WidgetWrapperController = container.getController("controllers/WidgetWrapperController");

    function WidgetWrapperDirective(){
        return {
            templateUrl: 'templates/widgets/widgetWrapper.html',
            controller: WidgetWrapperController,
            restrict: 'EA',
            transclude: true,
            scope: {
                widget: "="
            }
        }
    }

    return WidgetWrapperDirective;
});