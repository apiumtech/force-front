/* global assertNotNull */

define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q',
    'underscore',
    'shared/services/TranslatorService'
], function (AjaxService, Configuration, Q, _, TranslatorService) {
    'use strict';

    function WidgetService(ajaxService, translatorService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.translator = translatorService || TranslatorService.newInstance();
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
                var data = self.getWidgetData(page, res.data || res);
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
        var self = this;
        widgetList = widgetList.data || widgetList;

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
                widgetName: self.translator.translate(widget.WidgetName) || widget.WidgetName,
                widgetId: widget.Id,
                widgetContent: widget.WidgetContent,
                position: {
                    size: widget.NumColums
                },
                isActive: widget.Visible,
                dataEndpoint: widget.EndPoint,
                option: widget.WidgetOptions,
                endPoint: widget.EndPoint,
                description: self.translator.translate(widget.Description) || widget.Description,
                images: widget.Images
            };
            list.push(w);
        });
        return list;
    };

    return WidgetService;
});
