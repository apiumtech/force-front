define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q',
    'underscore'
], function (AjaxService, Configuration, Q, _) {
    'use strict';

    function WidgetService(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    WidgetService.inherits(Object, {});

    WidgetService.prototype.getWidgetsForPage = function (page) {
        assertNotNull("Page name", page);
        var self = this;

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
                var data = self.getWidgetData(page, res);
                deferred.resolve({data:{body:data}});
            },
            function (err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };

    /**
     * updateWidgetPosition()
     * @param newPositions Array<{id,position}>
     */
    WidgetService.prototype.updateWidgetPosition = function (newPositions) {
      var deferred = Q.defer();
      var params = {
          url: Configuration.api.changeWidgetOrder,
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          accept: 'application/json',
          data: {
            order: newPositions
          }
      };
      this.ajaxService.rawAjaxRequest(params).then(
          function(res){deferred.resolve({});},
          function (err) {deferred.reject(err);}
      );
      return deferred.promise;
    };

    WidgetService.prototype.updateWidgetVisibility = function (widgetId, isVisible) {
      var deferred = Q.defer();
      var url = Configuration.api.changeWidgetVisibilityToVisible;
      if(!isVisible){
        url = Configuration.api.changeWidgetVisibilityToHidden;
      }
      var params = {
          url: url,
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          accept: 'application/json',
          data: {
            id: widgetId
          }
      };
      this.ajaxService.rawAjaxRequest(params).then(
          function(res){deferred.resolve({});},
          function (err) {deferred.reject(err);}
      );
      return deferred.promise;
    };

    /*WidgetService.prototype.updatePageWidgets = function (data) {

        //TODO: request updates to server when having real API
        var deferred = Q.defer();
        setTimeout(deferred.reject.bind(deferred), 100, "WidgetService.updatePageWidgets dummy");
        return deferred.promise;

        //return this.ajaxService.rawAjaxRequest();
    };*/

    WidgetService.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var widgetService = new WidgetService(_ajaxService);
        return widgetService;
    };

    WidgetService.prototype.getWidgetData = function (page, widgetList) {
        /*widgetList = widgetList || [
            {
                page: "intensity",
                widgetType: "graph",
                endPoint: "graphWidgetIntensityDataApi",
                widgetName: "Widget A",
                order: 0,
                size: 12,
                id: 1
            },
            {
                page: "intensity",
                widgetType: "table",
                widgetName: "Ranking",
                endPoint: "rankingWidgetIntensityDataApi",
                order: 1,
                size: 12,
                id: 2
            },
            {
                page: "intensity",
                widgetType: "code",
                widgetName: "Custom",
                endPoint: "",
                order: 2,
                size: 12,
                id: 3
            },
            {
                page: "intensity",
                widgetType: "table",
                widgetName: "User extra fields",
                endPoint: "userExtraFieldsDataApi",
                widgetOptions: "userExtraFieldsDecorator",
                order: 3,
                size: 12,
                id: 4
            },
            {
                page: "distribution",
                widgetType: "map",
                widgetName: "GEOGRAPHICAL DISTRIBUTION",
                endPoint: "geographicalWidgetDistributionDataApi",
                order: 1,
                size: 12,
                id: 3
            },
            {
                page: "distribution",
                widgetType: "segment_distribution",
                widgetName: "Distribucion por segmento",
                endPoint: "segmentWidgetDistributionDataApi",
                order: 3,
                size: 6,
                id: 4
            },
            {
                page: "distribution",
                widgetType: "hour_distribution",
                widgetName: "DISTRIBUCION POR TIPO",
                endPoint: "typeWidgetDistributionDataApi",
                order: 3,
                size: 6,
                id: 5
            },
            {
                page: "distribution",
                widgetType: "hour_distribution_singleline",
                widgetName: "DISTRIBUCION HORARIA",
                endPoint: "hourWidgetDistributionDataApi",
                order: 4,
                size: 6,
                id: 6
            },
            {
                page: "distribution",
                widgetType: "bar",
                widgetOptions: 'tab',
                widgetName: "ANALISIS DE COBERTURA",
                endPoint: "coverageWidgetDistributionDataApi",
                order: 5,
                size: 6,
                id: 7
            },
            {
                page: "conversion",
                widgetType: "scatter",
                widgetName: "DIAGRAMA ACTIVIDAD / VENTAS",
                endPoint: "activityWidgetConversionDataApi",
                order: 0,
                size: 6,
                id: 8
            },
            {
                page: "conversion",
                widgetType: "bar",
                widgetOptions: 'dropdown',
                widgetName: "Efectividad visitas/venta",
                endPoint: "visitWidgetConversionDataApi",
                order: 1,
                size: 6,
                id: 9
            },
            {
                page: "conversion",
                widgetType: "table",
                widgetName: "Ranking",
                endPoint: "rankingWidgetConversionDataApi",
                order: 1,
                size: 12,
                id: 10
            }
        ];*/

        var pageWidgets = _.clone(_.filter(widgetList, function (widget) {
            return widget.Page === page;
        }));

        pageWidgets = _.sortBy(pageWidgets, function (widget) {
            return widget.Order;
        });

        var list = [];
        _.each(pageWidgets, function (widget) {
            var w = {
                type: (widget.WidgetType === "code" ? "custom" : widget.WidgetType),
                widgetName: widget.WidgetName,
                widgetId: widget.Id,
                widgetContent: widget.WidgetContent,
                position: {
                    size: widget.NumColums
                },
                isActive: true,// (Math.random() - 0.5 > 0),//TODO: change to widget.IsActive,
                //dataEndpoint: Configuration.api[widget.EndPoint],//TODO: (joanllenas) WIP, yet to be decided how to resolve endpoints
                dataEndpoint: widget.EndPoint,
                option: widget.WidgetOptions,
                endPoint: widget.EndPoint
            };
            list.push(w);
        });
        return list;
    };

    return WidgetService;
});
