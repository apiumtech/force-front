define([
  'shared/BaseView',
  'shared/services/config/PermissionsService',
  'modules/saleAnalytics/marketplace/MarketplacePresenter'
], function (BaseView, PermissionsService, MarketplacePresenter) {
  'use strict';

  function MarketplaceView($scope, presenter, permissionsService) {
    BaseView.call(this, $scope, null, presenter || new MarketplacePresenter());
    this.$scope = $scope;
    this.pageName = 'marketplace';
    this.data.filters = [];
    this.data.selectedFilter = null;
    this.data.selectedWidget = null;
    this.data.widgets = [];
    this.permissionsService = permissionsService || PermissionsService.newInstance();
    this.configureEvents();
    $scope.isReportsVisible = this.permissionsService.getPermission("reports_sfm.isEnabled", true);
  }

  MarketplaceView.inherits(BaseView, {
    pageName: {
      get: function () {
        return this.$scope.pageName;
      },
      set: function (value) {
        this.$scope.pageName = value;
      }
    }
  });

  MarketplaceView.prototype.configureEvents = function() {
    var self = this;

    self.fn.onInit = function() {
      self.event.getFilters();
    };

    self.fn.selectWidget = self.selectWidget.bind(self);
    self.fn.unselectCurrentWidget = self.unselectCurrentWidget.bind(self);

    self.fn.filterWidgetsByCategory = function(category) {
      self.data.selectedFilter = category;
      self.event.filterWidgetsByCategory(category.key);
    };

    this.show();
  };

  MarketplaceView.prototype.onFilterWidgetsByCategory = function(widgets) {
    this.data.widgets = widgets;
  };

  MarketplaceView.prototype.onGetFilters = function(filters) {
    this.data.filters = filters;
    this.fn.filterWidgetsByCategory( this.data.filters[0] );
  };

  MarketplaceView.prototype.selectWidget = function(widget) {
    this.data.selectedWidget = widget;
  };

  MarketplaceView.prototype.unselectCurrentWidget = function() {
    this.data.selectedWidget = null;
  };

  MarketplaceView.prototype.show = function() {
    var self = this;
    self.__base__.show.call(self);
    self.fn.onInit();
  };

  MarketplaceView.newInstance = function ($scope) {
    var view = new MarketplaceView($scope);
    return view._injectAspects();
  };

  return MarketplaceView;
});
