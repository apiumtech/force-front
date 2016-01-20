/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/TranslatorService',
    'config'
], function (WidgetBase, AuthAjaxService, TranslatorService, Configuration) {
    'use strict';

    function SingleLineChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

        this.translator = TranslatorService.newInstance();

        this.currentFilter = 'allActivities';
    }

    SingleLineChartWidgetModel.inherits(WidgetBase, {});

    SingleLineChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter.key) === -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter.key;
        }
    };

    /*SingleLineChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedFilter", tabName);
    };*/

    SingleLineChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.hourWidgetDistributionDataApi.format(this.currentFilter);
    };

    SingleLineChartWidgetModel.prototype.decorateServerData = function (data) {

        this.filters = [{
            name: this.translator.translate('tabDistribution.timeDistribution.dropDown.itemTotalActivities'),
            key: "allActivities"
        }, {
            name: this.translator.translate('tabDistribution.timeDistribution.dropDown.itemVisits'),
            key: "visits"
        }, {
            name: this.translator.translate('tabDistribution.timeDistribution.dropDown.itemEmails'),
            key: "emails"
        }, {
            name: this.translator.translate('tabDistribution.timeDistribution.dropDown.itemPhoneCalls'),
            key: "phoneCalls"
        }];

        var responseData = {
            data: {
                params: {
                    fields: [],
                    filters: this.filters
                }
            }
        };

        data.Series.forEach(function (series) {
            var decorated = {
                name: series.Name,
                data: series.Points.map(function (point) {
                    return point.Y;
                })
            };
            responseData.data.params.fields.push(decorated);
        });

        return responseData;
    };

    SingleLineChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    SingleLineChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    SingleLineChartWidgetModel.newInstance = function (ajaxService) {
        return new SingleLineChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return SingleLineChartWidgetModel;
});