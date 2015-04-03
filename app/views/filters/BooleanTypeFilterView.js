/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function BooleanFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        this.data.valueList = [];
        this.configureEvents();
    }

    BooleanFilterView.prototype = Object.create(BaseView.prototype, {});

    BooleanFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.fn.loadStringFilters = function (data) {

        };
    };

    BooleanFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        var view = new BooleanFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return BooleanFilterView;
});