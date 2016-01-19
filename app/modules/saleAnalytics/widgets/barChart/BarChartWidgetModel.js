/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/TranslatorService',
    'config'
], function(WidgetBase, AjaxService, TranslatorService, Configuration){
    'use strict';

    function BarChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

        this.translator = TranslatorService.newInstance();

        this.currentFilter = 'Segment';

        this.filters = [
            {
                name: this.translator.translate('tabDistribution.coverageAnalysis.selectButton.itemSegment'),
                key: "Segment",
                tooltip: this.translator.translate('tabDistribution.coverageAnalysis.tabFilter.segment.tooltip')
            },
            {
                name: this.translator.translate("tabDistribution.coverageAnalysis.selectButton.itemAccountType"),
                key: "AccountType",
                tooltip: this.translator.translate('tabDistribution.coverageAnalysis.tabFilter.accountType.tooltip')
            }
        ];
    }

    BarChartWidgetModel.inherits(WidgetBase, {});

    BarChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter.key) === -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter.key;
        }
    };

    BarChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    BarChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            "data": {
                "params": {
                    "filters": this.filters.slice(),
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
                //responseData.data.params.bars[index].data.push([dataIndex, point.Y]);
                responseData.data.params.bars[index].data.push([dataIndex, point]);
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