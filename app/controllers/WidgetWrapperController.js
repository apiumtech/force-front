/**
 * Created by justin on 12/18/14.
 */
app.registerController(function (container) {
    var WidgetWrapperView = container.getView('views/WidgetWrapperView');

    function WidgetWrapperController($scope, $element) {
        WidgetWrapperController.configureView($scope, $element);
    }

    WidgetWrapperController.configureView = function ($scope, $element) {
        this.view = WidgetWrapperView.newInstance($scope, $element);
        this.view.show();
    };

    return WidgetWrapperController;
});