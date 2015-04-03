/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function DatetimeTypeFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        this.data.valueList = [];
        this.configureEvents();
    }

    DatetimeTypeFilterView.prototype = Object.create(BaseView.prototype, {});

    DatetimeTypeFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.fn.loadStringFilters = function (data) {

        };
    };

    DatetimeTypeFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        var view = new DatetimeTypeFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return DatetimeTypeFilterView;
});