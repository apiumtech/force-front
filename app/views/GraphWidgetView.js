/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var GraphWidgetModel = container.getModel('models/GraphWidgetModel');
    var GraphWidgetPresenter = container.getPresenter('presenters/GraphWidgetPresenter');

    var Plot = container.getService('plots/Plot');
    var LineGraphPlot = container.getService('plots/LineGraphPlot');

    var LINE = 'line', FILLED = 'filled';

    function onlyVal(data) {
        return data[1];
    }

    function GraphWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope.filters = [];
        scope.selectedFilter = "";
        scope.selectedRangeOption = "hour";
        scope.currentChartType = LINE;
        var self = this;
        self.configureEvents();
    }

    GraphWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
        availableFields: {
            get: function () {
                return this.$scope.availableFields || (this.$scope.availableFields = []);
            },
            set: function (value) {
                this.$scope.availableFields = value;
            }
        }
    });

    GraphWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;

        self.fn.changeFilterRange = function (value) {
            self.$scope.selectedRangeOption = value;
            self.event.onFilterRangeChanged();
        };

        self.fn.changeFilter = function () {
            self.event.onFilterChanged();
        };

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.switchToFilled = function () {
            self.$scope.currentChartType = FILLED;
            self.refreshChart();
        };

        self.fn.switchToLine = function () {
            self.$scope.currentChartType = LINE;
            self.refreshChart();
        };

        self.fn.toggleDisplayField = function (fieldName) {
            self.availableFields.forEach(function (field) {
                if (field.name === fieldName) {
                    field.isDisplaying = !field.isDisplaying;
                }
            });

            self.refreshChart();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
    };

    GraphWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data.params;
        self.extractFilters();
        self.extractDisplayFields();
        self.refreshChart();
        self.event.onReloadWidgetDone();
    };

    GraphWidgetView.prototype.refreshChart = function () {
        var self = this,
            scope = self.$scope,
            data = self.data;

        if (!data.fields || !data.fields.length) return;

        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = self.getLineGraph(field, scope.availableFields, scope.currentChartType);
            chartFields.push(lineGraph);
        });

        self.paintChart(self.element.find('.chart-place-holder'), chartFields, data.axis);
    };

    GraphWidgetView.prototype.paintChart = function (element, chartFields, axisData) {
        var plot = Plot.basic(axisData.x, chartFields).getOrElse(throwException("invalid plot!"));
        plot.paint($(element));
    };

    GraphWidgetView.prototype.getLineGraph = function (fieldData, availableFields, chartType) {
        var fieldStatus = _.find(availableFields, function (field) {
            return field.name === fieldData.name;
        });

        var hidden = !fieldStatus.isDisplaying;

        var filled = chartType === 'filled';

        var lineGraph = GraphWidgetView.getLineGraphInstance(fieldData, hidden, filled);
        return lineGraph;
    };

    GraphWidgetView.prototype.extractFilters = function () {
        var self = this;
        self.$scope.filters = self.data.filters;
        var filterList = self.$scope.filters,
            currentSelectedFilter = self.$scope.selectedFilter;

        self.$scope.selectedFilter =
            currentSelectedFilter && filterList.indexOf(currentSelectedFilter) !== -1 ?
                currentSelectedFilter :
                self.$scope.filters[0];
    };

    GraphWidgetView.prototype.extractDisplayFields = function () {
        var self = this;
        var fieldsToMerge = self.availableFields;

        var newFields = self.data.fields.map(function (item) {
            return {
                name: item.name,
                isDisplaying: true
            };
        });

        newFields.forEach(function (field) {
            var isExisting = _.find(fieldsToMerge, function (c) {
                return c.name == field.name
            });

            if (undefined === isExisting)
                fieldsToMerge.push(field);
        });

        self.availableFields = fieldsToMerge;
    };

    GraphWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || GraphWidgetModel.newInstance().getOrElse(throwInstantiateException(GraphWidgetModel));
        var presenter = $presenter || GraphWidgetPresenter.newInstance().getOrElse(throwInstantiateException(GraphWidgetPresenter));

        var view = new GraphWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    GraphWidgetView.getLineGraphInstance = function (field, hidden, filled) {
        return LineGraphPlot.newInstance(field.name, field.data.map(onlyVal), hidden, filled);
    };

    return GraphWidgetView;
});