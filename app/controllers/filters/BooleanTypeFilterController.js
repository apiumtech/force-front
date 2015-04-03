/**
 * Created by justin on 4/2/15.
 */
app.registerController(function (container) {
    var BooleanTypeFilterView = container.getView("views/filters/BooleanTypeFilterView");

    function BooleanTypeFilterController($scope, $element) {
        BooleanTypeFilterController.configureView($scope, $element);
    }

    BooleanTypeFilterController.configureView = function ($scope, $element) {
        this.view = BooleanTypeFilterView.newInstance($scope, $element).getOrElse(throwInstantiateException(BooleanTypeFilterView));
        this.view.show();
    };

    return BooleanTypeFilterController;
});