define([
    'modules/saleAnalytics/marketplace/MarketplaceModel'
], function (MarketplaceModel) {
    'use strict';

    function MarketplacePresenter(model) {
        this.model = model || new MarketplaceModel();
    }

    MarketplacePresenter.prototype.show = function (view) {
      var model = this.model;
      view.event = view.event || {};

      view.event.filterWidgetsByCategory = function(category){
        return model.filterWidgetsByCategory(category)
          .then(view.onFilterWidgetsByCategory.bind(view));
      };

      view.event.searchWidgetByKeywords = function(keywords, selectedFilter){
        return model.searchWidgetByKeywords(keywords, selectedFilter)
          .then(view.onSearchWidgetByKeywords.bind(view));
      };

      view.event.getFilters = function(){
        return model.getFilters()
          .then(view.onGetFilters.bind(view));
      };

      view.event.updateWidgetVisibility = function (widgetId, isVisible, pageName) {
        return model.updateWidgetVisibility(widgetId, isVisible, pageName);
      };
    };

    return MarketplacePresenter;
});
