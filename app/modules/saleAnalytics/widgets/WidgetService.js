/**
 * Created by Justin on 1/5/2015.
 */

define([
    //TODO: replace by real AjaxService when having real data from server
    'shared/services/ajax/FakeAjaxService',
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q'
], function (FakeAjaxService, AjaxService, Configuration, Q) {
    'use strict';

    function WidgetService(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = new FakeAjaxService();
    }

    WidgetService.inherits(Object, {});

    WidgetService.prototype.getWidgetsForPage = function (page) {
        assertNotNull("Page name", page);
        var self = this;

        /*
        //TODO: remove when having real data from server
        var widgets = self.getWidgetData(page);
        var params = {
            result: {
                data: {
                    body: widgets
                }
            }
        };
        return this.fakeAjaxService.rawAjaxRequest(params);*/

        var deferred = Q.defer();
        var params = {
            url: Configuration.api.widgetList,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json'
        };
        this.ajaxService.rawAjaxRequest(params).then(
            function(res){
                var data = res.data;
                deferred.resolve(self.getWidgetData(page, data));
            },
            function (err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };

    WidgetService.prototype.updatePageWidgets = function (data) {

        //TODO: request updates to server when having real API
        return this.ajaxService.rawAjaxRequest();
    };

    WidgetService.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var widgetService = new WidgetService(_ajaxService);
        return widgetService;
    };

    WidgetService.prototype.getWidgetData = function (page, widgetList) {
        widgetList = widgetList || [
            {
                page: "intensity",
                widgetType: "graph",
                endPoint: Configuration.api.graphWidgetIntensityDataApi,
                widgetName: "Widget A",
                order: 0,
                size: 12,
                id: 1
            },
            {
                page: "intensity",
                widgetType: "table",
                widgetName: "Ranking",
                endPoint: Configuration.api.rankingWidgetIntensityDataApi,
                order: 1,
                size: 12,
                id: 2
            },
            {
                page: "intensity",
                widgetType: "custom",
                widgetName: "Custom",
                endPoint: Configuration.api.rankingWidgetIntensityDataApi,
                order: 2,
                size: 12,
                id: 3
            },
            {
                page: "distribution",
                widgetType: "map",
                widgetName: "GEOGRAPHICAL DISTRIBUTION",
                endPoint: Configuration.api.geographicalWidgetDistributionDataApi,
                order: 1,
                size: 12,
                id: 3
            },
            {
                page: "distribution",
                widgetType: "segment_distribution",
                widgetName: "Distribucion por segmento",
                endPoint: Configuration.api.segmentWidgetDistributionDataApi,
                order: 3,
                size: 6,
                id: 4
            },
            {
                page: "distribution",
                widgetType: "hour_distribution",
                widgetName: "DISTRIBUCION HORARIA",
                endPoint: Configuration.api.hourWidgetDistributionDataApi,
                order: 3,
                size: 6,
                id: 5
            },
            {
                page: "distribution",
                widgetType: "hour_distribution_singleline",
                widgetName: "DISTRIBUCION HORARIA",
                endPoint: Configuration.api.hourWidgetDistributionDataApi,
                order: 4,
                size: 6,
                id: 6
            },
            {
                page: "distribution",
                widgetType: "bar",
                widgetOption: 'tab',
                widgetName: "ANALISIS DE COBERTURA",
                endPoint: Configuration.api.coverageWidgetDistributionDataApi,
                order: 5,
                size: 6,
                id: 7
            },
            {
                page: "conversion",
                widgetType: "scatter",
                widgetName: "DIAGRAMA ACTIVIDAD / VENTAS",
                endPoint: Configuration.api.activityWidgetConversionDataApi,
                order: 0,
                size: 6,
                id: 8
            },
            {
                page: "conversion",
                widgetType: "bar",
                widgetOption: 'dropdown',
                widgetName: "Efectividad visitas/venta",
                endPoint: Configuration.api.visitWidgetConversionDataApi,
                order: 1,
                size: 6,
                id: 9
            },
            {
                page: "conversion",
                widgetType: "table",
                widgetName: "Ranking",
                // TODO: change to conversion api
                endPoint: Configuration.api.rankingWidgetIntensityDataApi,
                order: 1,
                size: 12,
                id: 10
            }
        ];

        var pageWidgets = _.clone(_.filter(widgetList, function (widget) {
            return widget.page === page;
        }));

        pageWidgets = _.sortBy(pageWidgets, function (widget) {
            return widget.order;
        });

        var list = [];
        _.each(pageWidgets, function (widget) {
            var w = {
                type: widget.widgetType,
                widgetName: widget.widgetName,
                widgetId: widget.id,
                position: {
                    size: widget.size
                },
                dataEndpoint: Configuration.api[widget.endPoint],//TODO: (joanllenas) WIP, yet to be decided how to resolve endpoints
                option: widget.widgetOption
            };
            list.push(w);
        });
        return list;
    };

    return WidgetService;
});