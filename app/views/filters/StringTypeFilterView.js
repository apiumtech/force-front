/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function StringTypeFilterView($scope, $element, $attr, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$element = $element;
        this.$attr = $attr;
    }

    StringTypeFilterView.prototype = Object.create(BaseView.prototype, {});

    StringTypeFilterView.newInstance = function ($scope, $element, $attr, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};
        $attr = $attr || {};

        var view = new StringTypeFilterView($scope, $element, $attr, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return StringTypeFilterView;
});