/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var PieChartWidgetModel = container.getModel("models/widgets/PieChartWidgetModel");
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var Configuration = container.getService('Configuration');

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

    HourPieChartWidgetModel.prototype.getUrl = function(){
        return Configuration.api.hourWidgetDistributionDataApi.format(this.currentFilter);
    };

    HourPieChartWidgetModel.newInstance = function (ajaxService) {
        return new HourPieChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return HourPieChartWidgetModel;
});