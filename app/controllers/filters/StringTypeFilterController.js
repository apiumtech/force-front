/**
 * Created by justin on 4/2/15.
 */
app.registerController(function (container) {
    var StringTypeFilterView = container.getView("views/filters/StringTypeFilterView");

    function StringTypeFilterController($scope, $element) {
        StringTypeFilterController.configureView($scope, $element);
    }

    StringTypeFilterController.configureView = function ($scope, $element) {
        this.view = StringTypeFilterView.newInstance($scope, $element).getOrElse(throwInstantiateException(StringTypeFilterView));
        this.view.show();
    };

    return StringTypeFilterController;
});