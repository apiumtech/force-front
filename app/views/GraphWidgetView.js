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

    var d1 = [[0, 42], [1, 53], [2,66], [3, 60], [4, 68], [5, 66], [6,71],[7, 75], [8, 69], [9,70], [10, 68], [11, 72], [12, 78], [13, 86]];
    var d2 = [[0, 12], [1, 26], [2,13], [3, 18], [4, 35], [5, 23], [6, 18],[7, 35], [8, 24], [9,14], [10, 14], [11, 29], [12, 30], [13, 43]];

    function onlyVal(data) {
        return data[1];
    }

    function GraphWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope._widget = null;
        var self = this;
        self.configureEvents();

        var lgp1 = LineGraphPlot.newInstance("Page Views", d1.map(onlyVal), false, true);
        var lgp2 = LineGraphPlot.newInstance("Visitors", d2.map(onlyVal), false, true);
        var plot = Plot.basic(["Visits"], [lgp1, lgp2]).getOrElse(throwException("invalid plot!"));

        setTimeout(function () {
            var widget = $(".widget");
            plot.paint(widget);
        }, 5);
    }

    GraphWidgetView.prototype = Object.create(WidgetBaseView.prototype, {});

    GraphWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };
    };

    GraphWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data;
        self.event.onReloadWidgetDone();
    };

    GraphWidgetView.prototype.onMoveWidgetSuccess = function (data) {
        console.log("Widget moved to new position");
    };

    GraphWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    GraphWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || GraphWidgetModel.newInstance().getOrElse(throwInstantiateException(GraphWidgetModel));
        var presenter = $presenter || GraphWidgetPresenter.newInstance().getOrElse(throwInstantiateException(GraphWidgetPresenter));

        var view = new GraphWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return GraphWidgetView;
});