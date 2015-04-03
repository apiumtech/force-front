/**
 * Created by justin on 4/2/15.
 */
app.registerController(function (container) {
    var DatetimeTypeFilterView = container.getView("views/filters/DatetimeTypeFilterView");

    function DatetimeTypeFilterController($scope, $element) {
        DatetimeTypeFilterController.configureView($scope, $element);
    }

    DatetimeTypeFilterController.configureView = function ($scope, $element) {
        this.view = DatetimeTypeFilterView.newInstance($scope, $element).getOrElse(throwInstantiateException(DatetimeTypeFilterView));
        this.view.show();
    };

    return DatetimeTypeFilterController;
});