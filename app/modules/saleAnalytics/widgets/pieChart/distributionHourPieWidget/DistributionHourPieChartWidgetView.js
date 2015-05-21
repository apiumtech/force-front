/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetView',
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieChartWidgetModel'
], function(PieChartWidgetPresenter, PieChartWidgetView, DistributionHourPieChartWidgetModel){

    function HourPieChartWidgetView(scope, element, model, presenter) {
        PieChartWidgetView.call(this, scope, element, model, presenter);
    }

    HourPieChartWidgetView.prototype = Object.create(PieChartWidgetView.prototype, {});

    HourPieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || DistributionHourPieChartWidgetModel.newInstance();
        var presenter = $presenter || PieChartWidgetPresenter.newInstance();

        var view = new HourPieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return HourPieChartWidgetView;
});