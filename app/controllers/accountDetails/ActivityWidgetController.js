/**
 * Created by justin on 3/13/15.
 */
app.registerController(function (container) {
    var ActivityWidgetView = container.getView("views/accountDetails/ActivityWidgetView");

    function ActivityWidgetController($scope, $element) {
        ActivityWidgetController.configureView($scope, $element);
    }

    ActivityWidgetController.configureView = function ($scope, $element) {
        this.view = ActivityWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(ActivityWidgetView));
        this.view.show();
    };

    return ActivityWidgetController;
});