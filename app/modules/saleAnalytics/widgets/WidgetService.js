/**
 * Created by Justin on 1/5/2015.
 */

define([
    //TODO: replace by real AjaxService when having real data from server
    'shared/services/ajax/FakeAjaxService'
    //'shared/services/ajax/AjaxService'
], function (AjaxService) {
    'use strict';

    function WidgetService(ajaxService) {
        this.ajaxService = ajaxService;
    }

    WidgetService.prototype = Object.create(Object.prototype, {});

    WidgetService.prototype.getWidgetsForPage = function (page) {
        assertNotNull("Page name", page);
        var self = this;

        //TODO: remove when having real data from server
        var widgets = self.getWidgetData(page);
        var params = {
            result: {
                data: {
                    body: widgets
                }
            }
        };

        return this.ajaxService.rawAjaxRequest(params);
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

    WidgetService.prototype.getWidgetData = function (page) {
        var widgetList = [
            {
                page: "intensity",
                widgetType: "graph",
                widgetName: "Widget A",
                imgUrl: 'chart-1.jpg',
                data: {},
                widgetId: 1,
                order: 0,
                size: 12
            },
            {
                page: "intensity",
                widgetType: "table",
                widgetName: "Ranking",
                widgetId: 2,
                order: 1,
                size: 12,
                data: {}
            },
            {
                page: "distribution",
                widgetType: "map",
                widgetName: "GEOGRAPHICAL DISTRIBUTION",
                widgetId: 3,
                order: 1,
                size: 12
            },
            {
                page: "distribution",
                widgetType: "segment_distribution",
                widgetName: "Distribucion por segmento",
                widgetId: 1029,
                order: 3,
                size: 6,
                data: {}
            },
            {
                page: "distribution",
                widgetType: "hour_distribution",
                widgetName: "DISTRIBUCION HORARIA",
                widgetId: 5,
                order: 3,
                size: 6,
                data: {}
            },
            {
                page: "distribution",
                widgetType: "hour_distribution_singleline",
                widgetName: "DISTRIBUCION HORARIA",
                data: {},
                widgetId: 2002,
                order: 4,
                size: 6
            },
            {
                page: "distribution",
                widgetType: "bar",
                widgetName: "ANALISIS DE COBERTURA",
                widgetId: 2003,
                order: 5,
                size: 6,
                data: {}
            },
            {
                page: "conversion",
                widgetType: "scatter",
                widgetName: "DIAGRAMA ACTIVIDAD / VENTAS",
                widgetId: 9,
                order: 0,
                size: 6,
                data: {}
            },
            {
                page: "conversion",
                widgetType: "bar",
                widgetName: "Efectividad visitas/venta",
                widgetId: 10,
                order: 1,
                size: 6,
                data: {}
            },
            {
                page: "conversion",
                widgetType: "table",
                widgetName: "Ranking",
                widgetId: 12,
                order: 1,
                size: 12,
                data: {}
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
                widgetId: widget.widgetId,
                position: {
                    size: widget.size
                },
                dataEndpoint: widget.widgetId
            };
            list.push(w);
        });
        return list;
    };

    return WidgetService;
});