/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/config/PermissionsService',
    'shared/services/TranslatorService'
], function (AuthAjaxService, WidgetBase, PermissionsService, TranslatorService) {
    'use strict';

    function GraphChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

        var self = this;
        self.translator = TranslatorService.newInstance();
        self.currentFilter = 'visits';
        self.filters = [{
            name: self.translator.translate('tabIntensity.activities.dropDown.itemVisits'),
            key: 'visits'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemTimeOfPhoneCalls'),
            key: 'phoneCallsTime'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemEmails'),
            key: 'emails'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemActivities'),
            key: 'activities'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemActivityScores'),
            key: 'activityScores'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemNewOrders'),
            key: 'orders'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemNewQuotes'),
            key: 'quotes'
        }, {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemNewOpportunities'),
            key: 'opportunities'
        }];

        var ps = PermissionsService.newInstance();
        self.filters = self.filters.filter(function(item){
            var PHONE_CALLS = "getphonecalls.isEnabled";
            var EMAILS      = "getemails.isEnabled";
            var ORDERS      = "pedidos.isEnabled";
            var QUOTES      = "ofertas.isEnabled";

            var key = item.key;
            return  key === 'phoneCallsTime' ? ps.getPermission(PHONE_CALLS, true) :
                    key === 'emails' ? ps.getPermission(EMAILS, true) :
                    key === 'orders' ? ps.getPermission(ORDERS, true) :
                    key === 'quotes' ? ps.getPermission(QUOTES, true) :
                    true;
        });

        this.queries.grouping = "week";
    }

    GraphChartWidgetModel.inherits(WidgetBase, {});

    GraphChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) === -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter;
        }
    };

    GraphChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    GraphChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    GraphChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    GraphChartWidgetModel.prototype.decorateServerData = function (data) {
        var self = this;
        var responseData = {
            data: {
                params: {
                    axis: {
                        x: [],
                        y: ""
                    },
                    fields: [],
                    filters: this.filters
                }
            }
        };

        if( data.Labels.length > 0 ) {
            responseData.data.params.axis.x = data.Labels[0];
        }

        data.Series.forEach(function (series) {
            var decorated = {
                name: self.camelizeName(series.Name),
                data: series.Points.map(function (point) {
                    return point.Y;
                })
            };
            responseData.data.params.fields.push(decorated);
        });

        return responseData;
    };

    GraphChartWidgetModel.prototype.camelizeName = function(name){
        var camelizedName = name;
        if(name && name !== ""){
            try {
                camelizedName = name.split(" ")
                    .filter(function(n){
                        return n !== "";
                    })
                    .map(function (n) {
                        return n[0].toUpperCase() + n.substr(1).toLowerCase();
                    })
                    .join(" ");
            }catch(err){
                console.error(err);
            }
        }
        return camelizedName;
    };

    GraphChartWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new GraphChartWidgetModel(ajaxService);
    };

    return GraphChartWidgetModel;
});