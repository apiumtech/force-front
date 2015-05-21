/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'config'
], function(WidgetBase, AjaxService, Configuration){

    function BarChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.currentFilter = 'AccountType';
        this.filters = [{
            name: "Account Type",
            key: "AccountType"
        }, {
            name: "Segment",
            key: "Segment"
        }];
    }

    BarChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    BarChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
    };

    BarChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.coverageWidgetDistributionDataApi.format(this.currentFilter);
    };

    BarChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            "data": {
                "params": {
                    "filters": this.filters,
                    "axis": {"x": []},
                    "bars": []
                }
            }
        };

        data.Labels[0].forEach(function (label) {
            responseData.data.params.bars.push({
                data: [],
                label: label
            });
        });

        data.Series.forEach(function (i) {
            responseData.data.params.axis.x.push(i.Name);
            i.Points.forEach(function (point, index) {
                var dataIndex = responseData.data.params.bars[index].data.length;
                responseData.data.params.bars[index].data.push([dataIndex, point.Y]);
            });
        });

        return responseData;
    };

    BarChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    BarChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    BarChartWidgetModel.newInstance = function (ajaxService) {
        return new BarChartWidgetModel(ajaxService || AjaxService.newInstance());
    };

    return BarChartWidgetModel;
});