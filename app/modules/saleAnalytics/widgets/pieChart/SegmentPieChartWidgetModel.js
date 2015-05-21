/**
 * Created by justin on 1/26/15.
 */

define([], function(){
    var PieChartWidgetModel = container.getModel("models/widgets/PieChartWidgetModel");
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var Configuration = container.getService('Configuration');

    function SegmentPieChartWidgetModel(ajaxService) {
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

    SegmentPieChartWidgetModel.prototype = Object.create(PieChartWidgetModel.prototype, {});

    SegmentPieChartWidgetModel.prototype.getUrl = function(){
        return Configuration.api.segmentWidgetDistributionDataApi.format(this.currentFilter);
    };

    SegmentPieChartWidgetModel.newInstance = function (ajaxService) {
        return new SegmentPieChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return SegmentPieChartWidgetModel;
});