/**
 * Created by justin on 3/13/15.
 */
app.registerController(function (container) {
    var WidgetWrapperView = container.getView('views/widgets/WidgetWrapperView');

    function WidgetWrapperController($scope, $element, $compile) {
        WidgetWrapperController.configureView($scope, $element);
    }

    WidgetWrapperController.configureView = function ($scope, $element) {
        this.view = WidgetWrapperView.newInstance($scope, $element);
        this.view.show();
    };

    return ['$scope', '$element', '$compile', WidgetWrapperController];
});