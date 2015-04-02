/**
 * Created by justin on 4/2/15.
 */
app.registerController(function (container) {
    var StringTypeFilterView = container.getView("views/filters/StringTypeFilterView");

    function StringTypeFilterController($scope, $element, $attr) {
        StringTypeFilterController.configureView($scope, $element, $attr);
    }

    StringTypeFilterController.configureView = function ($scope, $element, $attr) {
        this.view = StringTypeFilterView.newInstance($scope, $element, $attr).getOrElse(throwInstantiateException(StringTypeFilterView));
        this.view.show();
    };

    return StringTypeFilterController;
});