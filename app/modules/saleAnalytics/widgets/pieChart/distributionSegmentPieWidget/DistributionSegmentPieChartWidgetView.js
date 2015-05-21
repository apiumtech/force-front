/**
 * Created by justin on 1/26/15.
 */

define([], function(){
    var PieChartWidgetPresenter = container.getPresenter('presenters/widgets/PieChartWidgetPresenter');
    var PieChartWidgetView = container.getView("views/widgets/PieChartWidgetView");
    var SegmentPieChartWidgetModel = container.getModel('models/widgets/SegmentPieChartWidgetModel');

    function SegmentPieChartWidgetView(scope, element, model, presenter) {
        PieChartWidgetView.call(this, scope, element, model, presenter);
    }

    SegmentPieChartWidgetView.prototype = Object.create(PieChartWidgetView.prototype, {});

    SegmentPieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SegmentPieChartWidgetModel.newInstance();
        var presenter = $presenter || PieChartWidgetPresenter.newInstance();

        var view = new SegmentPieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SegmentPieChartWidgetView;
});