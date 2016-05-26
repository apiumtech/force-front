define([
  'q',
  'modules/saleAnalytics/widgets/WidgetService',
  'shared/services/TranslatorService',
  'shared/services/StorageService'
], function (Q, WidgetService, TranslatorService, StorageService) {
  "use strict";

    function MarketplaceModel(widgetService, translatorService) {
      this.widgetService = widgetService || new WidgetService();
      this.translator = translatorService || TranslatorService.newInstance();
      this.storageService = StorageService.newInstance();
    }

    MarketplaceModel.prototype.updateWidgetVisibility = function (widgetId, isVisible, pageName) {
      var self = this;
      var deferred = Q.defer();
      self.widgetService.updateWidgetVisibility(widgetId, isVisible)
        .then(function(){
          deferred.resolve("ok");
        });
      return deferred.promise;
    };

    MarketplaceModel.prototype.filterWidgetsByCategory = function(category) {
      if(category === 'all') {
        return this.getAllWidgets();
      }
      return this.widgetService.getWidgetsForPage(category)
        .then(this.decorateWidgets.bind(this, category));
    };

    MarketplaceModel.prototype.searchWidgetByKeywords = function(keywords, selectedFilter) {
      var deferred = Q.defer();
      var filterByKeyword = function(widgets) {
          var filtered = widgets.filter(function(widget){
            return widget.name.toLowerCase().indexOf(keywords.toLowerCase()) > -1 ||
                   widget.description.toLowerCase().indexOf(keywords.toLowerCase()) > -1;
          });
          return filtered;
      };

      if(selectedFilter==='all') {
        this.getAllWidgets()
          .then(function(widgets){
            deferred.resolve(filterByKeyword(widgets));
          });
      } else {
        this.widgetService.getWidgetsForPage(selectedFilter)
          .then(this.decorateWidgets.bind(this, selectedFilter))
          .then(function(widgets){
            deferred.resolve(filterByKeyword(widgets));
          });
      }
      return deferred.promise;
    };

    MarketplaceModel.prototype.getAllWidgets = function() {
      return Q.all([
        this.widgetService.getWidgetsForPage('intensity').then(this.decorateWidgets.bind(this, 'intensity')),
        this.widgetService.getWidgetsForPage('distribution').then(this.decorateWidgets.bind(this, 'distribution')),
        this.widgetService.getWidgetsForPage('conversion').then(this.decorateWidgets.bind(this, 'conversion'))
      ]).then(function(results) {
        var all = [];
        results.forEach(function(widgets){
          all = all.concat(widgets);
        });
        return all;
      });
    };

    MarketplaceModel.prototype.decorateWidgets = function(category, widgets) {
      var self = this;
      return widgets.data.body.map(function(widget){
        return {
          id: widget.widgetId,
          name: widget.widgetName,
          description: self.translator.translate(widget.description) || widget.description,
          images: widget.images.map(function(img, index) {
            return {
              url: img,
              id: index
            };
          }),
          category: category,
          visible: widget.isActive
        };
      });
    };

    MarketplaceModel.prototype.getFilters = function() {
      var self = this;
      var deferred = Q.defer();
      setTimeout(function () {
        deferred.resolve([
          {key: 'all', name: self.translator.translate('label_all')},
          {key: 'intensity', name: self.translator.translate('LeftMenu.Intensity')},
          {key: 'distribution', name: self.translator.translate('LeftMenu.Distribution')},
          {key: 'conversion', name: self.translator.translate('LeftMenu.Conversion')}
        ]);
      } ,1);
      return deferred.promise;
    };

    return MarketplaceModel;
});
