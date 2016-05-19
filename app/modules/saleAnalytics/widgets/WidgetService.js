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
        widgetList = widgetList.data || widgetList;

        var pageWidgets = _.clone(_.filter(widgetList, function (widget) {
            return widget.Page === page;
        }));

        pageWidgets = _.sortBy(pageWidgets, function (widget) {
            return widget.Order;
        });

        var loremIpsum = 'Lorem ipsum dolor sit amet, ex pri meis disputationi. Quot alienum no pro, nam et tamquam deseruisse. Eam ei augue detracto, idque civibus definitiones no his. Mea copiosae praesent cotidieque eu. Ridens delenit consulatu no sea. Nisl volumus iudicabit eu qui. Te regione appetere concludaturque vim. Liber eruditi eum ad, fugit altera mel te, facilisi recteque mei at. Magna doming euripidis sed ei, ridens petentium vix in, libris officiis adipiscing in duo. Mel choro repudiandae an, porro percipitur dissentiet eos et.';
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
                endPoint: widget.EndPoint,
                description: loremIpsum, // widget.Description,
                images: ['assets/images/chart-sample.png', 'assets/images/chart-sample.png'] // widget.Images
            };
            list.push(w);
        });
        return list;
    };

    return WidgetService;
});
