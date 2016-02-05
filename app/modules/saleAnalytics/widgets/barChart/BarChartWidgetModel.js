/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/TranslatorService',
    'moment'
], function(WidgetBase, AjaxService, TranslatorService, moment){
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
                    "axis": {"x": [], "cycle": []},
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

        var currentLocale = moment.localeData();
        var dateFormat = currentLocale.longDateFormat('L');
        data.Series.forEach(function (i) {
            responseData.data.params.axis.x.push(i.Name);
            //i.Cycle = {FromDate:'2015-08-17T00:00:00.000', ToDate:'2015-08-27T00:00:00.000'}
            responseData.data.params.axis.cycle.push( i.Cycle ? moment(i.Cycle.FromDate).format(dateFormat) +' - '+ moment(i.Cycle.ToDate).format(dateFormat) : '' );

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