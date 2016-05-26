/* global assertNotNull */

define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q',
    'underscore',
    'shared/services/TranslatorService',
    'shared/services/StorageService'
], function (AjaxService, Configuration, Q, _, TranslatorService, StorageService) {
    'use strict';

    function WidgetService(ajaxService, translatorService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.translator = translatorService || TranslatorService.newInstance();
        this.storageService = StorageService.newInstance();
    }

    WidgetService.inherits(Object, {});

    WidgetService.prototype.getWidgetsForPage = function (page) {
        assertNotNull("Page name", page);
        var self = this;
        var deferred = Q.defer();

        var allWidgets = self.storageService.retrieve('all_widgets', true);
        if(!allWidgets) {
          var params = {
              url: Configuration.api.widgetList,
              type: 'GET',
              dataType: 'json',
              contentType: 'application/json',
              accept: 'application/json'
          };
          this.ajaxService.rawAjaxRequest(params).then(
              function(res){
                  self.storageService.store('all_widgets', res.data || res, true);
                  var data = self.getWidgetData(page, res.data || res);
                  deferred.resolve({data:{body:data}});
              },
              function (err) {
                  deferred.reject(err);
              }
          );
        } else {
          setTimeout(function(){
            var data = self.getWidgetData(page, allWidgets.data || allWidgets);
            deferred.resolve({data:{body:data}});
          },1);
        }

        return deferred.promise;
    };

    /**
     * updateWidgetPosition()
     * @param newPositions Array<{id,position}>
     */
    WidgetService.prototype.updateWidgetPosition = function (newPositions) {
      this.clearWidgetData();
      var deferred = Q.defer();
      var params = {
          url: Configuration.api.changeWidgetOrder,
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          accept: 'application/json',
          data: newPositions
      };
      this.ajaxService.rawAjaxRequest(params).then(
          function(res){deferred.resolve({});},
          function (err) {deferred.reject(err);}
      );
      return deferred.promise;
    };

    WidgetService.prototype.updateWidgetVisibility = function (widgetId, isVisible) {
      this.clearWidgetData();
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

    WidgetService.prototype.clearWidgetData = function () {
      var self = this;
      self.storageService.remove('all_widgets', true);
      var pages = ['intensity','distribution','conversion'];
      pages.forEach(function(page){
        var pageLayoutStorageKey = "pageLayout_" + page;
        self.storageService.remove(pageLayoutStorageKey, true);
      });
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
                    size: widget.NumColumns
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

    WidgetService.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var widgetService = new WidgetService(_ajaxService);
        return widgetService;
    };

    return WidgetService;
});
