/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetModel',
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (PieChartWidgetModel, AuthAjaxService, Configuration) {

    function HourPieChartWidgetModel(ajaxService) {
        PieChartWidgetModel.call(this, ajaxService);

        this.currentFilter = 'allActivities';
        this.filters = [{
            name: "Total Activities",
            key: "allActivities"
        }, {
            name: "Visits",
            key: "visits"
        }];
    }

    HourPieChartWidgetModel.prototype = Object.create(PieChartWidgetModel.prototype, {});

    HourPieChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.hourWidgetDistributionDataApi.format(this.currentFilter);
    };

    HourPieChartWidgetModel.newInstance = function (ajaxService) {
        return new HourPieChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return HourPieChartWidgetModel;
});