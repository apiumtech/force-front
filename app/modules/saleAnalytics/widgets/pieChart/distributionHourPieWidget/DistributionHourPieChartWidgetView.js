/**
 * Created by justin on 1/26/15.
 */

define([], function(){
    var PieChartWidgetPresenter = container.getPresenter('presenters/widgets/PieChartWidgetPresenter');
    var PieChartWidgetView = container.getView("views/widgets/PieChartWidgetView");
    var HourPieChartWidgetModel = container.getModel('models/widgets/HourPieChartWidgetModel');

    function HourPieChartWidgetView(scope, element, model, presenter) {
        PieChartWidgetView.call(this, scope, element, model, presenter);
    }

    HourPieChartWidgetView.prototype = Object.create(PieChartWidgetView.prototype, {});

    HourPieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || HourPieChartWidgetModel.newInstance();
        var presenter = $presenter || PieChartWidgetPresenter.newInstance();

        var view = new HourPieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return HourPieChartWidgetView;
});