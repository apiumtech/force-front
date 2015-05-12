/**
 * Created by justin on 1/26/15.
 */

app.registerView(function (container) {
    var PieChartWidgetPresenter = container.getPresenter('presenters/PieChartWidgetPresenter');
    var PieChartWidgetView = container.getView("views/PieChartWidgetView");
    var SegmentPieChartWidgetModel = container.getModel('models/SegmentPieChartWidgetModel');

    function SegmentPieChartWidgetView(scope, element, model, presenter) {
        PieChartWidgetView.call(this, scope, element, model, presenter);
    }

    SegmentPieChartWidgetView.prototype = Object.create(PieChartWidgetView.prototype, {});

    SegmentPieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SegmentPieChartWidgetModel.newInstance().getOrElse(throwInstantiateException(SegmentPieChartWidgetModel));
        var presenter = $presenter || PieChartWidgetPresenter.newInstance().getOrElse(throwInstantiateException(PieChartWidgetPresenter));

        var view = new SegmentPieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SegmentPieChartWidgetView;
});