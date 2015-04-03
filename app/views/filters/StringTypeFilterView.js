/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var StringTypeFilterModel = container.getModel('models/filters/StringTypeFilterModel');
    var StringTypeFilterPresenter = container.getModel('presenters/filters/StringTypeFilterPresenter');

    function StringTypeFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        this.data.valueList = [];
        this.data.filterValue = '';
        this.configureEvents();
    }

    StringTypeFilterView.prototype = Object.create(BaseView.prototype, {});

    StringTypeFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.fn.loadStringFilters = function (filterValue) {
            self.event.searchValueChanged(scope.filterFor.data, filterValue);
        };

        scope.$watch('filterFor', self.onFieldChanged.bind(self));
    };

    StringTypeFilterView.prototype.onFieldChanged = function () {
        var self = this;
        var value = self.$scope.filterFor;
        if (value) {
            self.event.searchValueChanged(value.data, self.data.filterValue);
        }
    };

    StringTypeFilterView.prototype.onFieldValuesLoaded = function (data) {
        this.data.valueList = data;
        console.log(data);
    };

    StringTypeFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        $model = $model || StringTypeFilterModel.newInstance().getOrElse(throwInstantiateException(StringTypeFilterModel));
        $presenter = $presenter || StringTypeFilterPresenter.newInstance().getOrElse(throwInstantiateException(StringTypeFilterPresenter));

        var view = new StringTypeFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };
    return StringTypeFilterView;
});