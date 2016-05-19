define([
  'q',
  'modules/saleAnalytics/widgets/WidgetService',
  'shared/services/TranslatorService'
], function (Q, WidgetService, TranslatorService) {
  "use strict";

    function MarkeplaceModel(widgetService, translatorService) {
      this.widgetService = widgetService || new WidgetService();
      this.translator = translatorService || TranslatorService.newInstance();
    }

    MarkeplaceModel.prototype.filterWidgetsByCategory = function(category) {
      if(category === 'all') {
        return this.getAllWidgets();
      }
      return this.widgetService.getWidgetsForPage(category)
        .then(this.decorateWidgets.bind(this, category));
    };

    MarkeplaceModel.prototype.searchWidgetByKeywords = function(keywords, selectedFilter) {
      var filterByKeyword = function(widgets) {
          var filtered = widgets.filter(function(widget){
            return widget.name.toLowerCase().indexOf(keywords.toLowerCase()) > -1 || widget.description.toLowerCase().indexOf(keywords.toLowerCase());
          });
          return filtered;
      };

      if(selectedFilter==='all') {
        return this.getAllWidgets().then(filterByKeyword);
      } else {
        return this.widgetService.getWidgetsForPage(selectedFilter)
                .then(this.decorateWidgets.bind(this, selectedFilter))
                .then(filterByKeyword);
      }
    };

    MarkeplaceModel.prototype.getAllWidgets = function() {
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

    MarkeplaceModel.prototype.decorateWidgets = function(category, widgets) {
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
          category: category
        };
      });
    };

    MarkeplaceModel.prototype.getFilters = function() {
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

    return MarkeplaceModel;
});
