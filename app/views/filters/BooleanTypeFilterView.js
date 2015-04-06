/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function BooleanFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        this.data.valueList = [{
            name: 'true',
            selected: false
        }, {
            name: 'false',
            selected: false
        }];
        this.configureEvents();
    }

    BooleanFilterView.prototype = Object.create(BaseView.prototype, {});

    BooleanFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.data.requestingFilterList = false;
        self.fn.loadStringFilters = function () {
            self.data.requestingFilterList = true;
            self.awaitHelper.await(self.fn.fireSearchEvent, 200);
        };

        self.fn.fireSearchEvent = function () {
            self.event.searchValueChanged(scope.filterFor.data, self.data.filterValue);
            self.data.requestingFilterList = false;
        };

        self.fn.prePostFilterChanged = function () {
            var selected = self.data.valueList.filter(function (record) {
                return record.selected;
            }).map(function (r) {
                return r.name;
            });

            self.event.filterSelectionToggled(scope.filterFor.data, selected);
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