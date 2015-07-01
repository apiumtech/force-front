/**
 * Created by justin on 4/2/15.
 */
define([
    'shared/BaseView',
    'modules/account/filters/stringTypeFilter/StringTypeFilterModel',
    'modules/account/filters/stringTypeFilter/StringTypeFilterPresenter',
    'shared/services/AwaitHelper'
], function (BaseView, StringTypeFilterModel, StringTypeFilterPresenter, AwaitHelper) {

    function StringTypeFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        this.awaitHelper = AwaitHelper.newInstance();
        this.data.valueList = [];
        this.data.filterValue = '';
        this.configureEvents();
    }

    StringTypeFilterView.inherits(BaseView, {});

    StringTypeFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.data.requestingFilterList = false;
        self.fn.loadStringFilters = function () {
            self.data.requestingFilterList = true;
            self.awaitHelper.await(self.fn.fireSearchEvent, 200);
        };

        self.fn.fireSearchEvent = function () {
            self.event.searchValueChanged(scope.filterFor.key, self.data.filterValue);
        };

        self.fn.prePostFilterChanged = function () {
            var selected = self.data.valueList.filter(function (record) {
                return record.selected;
            }).map(function (r) {
                return r.name;
            });

            self.event.filterSelectionToggled(scope.filterFor.key, selected);
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
        this.data.requestingFilterList = false;
    };

    StringTypeFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        $model = $model || StringTypeFilterModel.newInstance();
        $presenter = $presenter || StringTypeFilterPresenter.newInstance();

        var view = new StringTypeFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };
    return StringTypeFilterView;
});