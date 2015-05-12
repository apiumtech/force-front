/**
 * Created by justin on 1/26/15.
 */

app.registerView(function (container) {
    var PieChartWidgetPresenter = container.getPresenter('presenters/PieChartWidgetPresenter');
    var PieChartWidgetView = container.getView("views/PieChartWidgetView");
    var HourPieChartWidgetModel = container.getModel('models/HourPieChartWidgetModel');

    function HourPieChartWidgetView(scope, element, model, presenter) {
        PieChartWidgetView.call(this, scope, element, model, presenter);
    }

    HourPieChartWidgetView.prototype = Object.create(PieChartWidgetView.prototype, {});

    HourPieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || HourPieChartWidgetModel.newInstance().getOrElse(throwInstantiateException(HourPieChartWidgetModel));
        var presenter = $presenter || PieChartWidgetPresenter.newInstance().getOrElse(throwInstantiateException(PieChartWidgetPresenter));

        var view = new HourPieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return HourPieChartWidgetView;
});