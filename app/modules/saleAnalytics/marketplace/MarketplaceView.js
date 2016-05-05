define([
  'shared/BaseView',
  'shared/services/config/PermissionsService',
  'modules/saleAnalytics/marketplace/MarketplacePresenter',
  'shared/services/TranslatorService'
], function (BaseView, PermissionsService, MarketplacePresenter, TranslatorService) {
  'use strict';

  function MarketplaceView($scope, presenter, permissionsService) {
    BaseView.call(this, $scope, null, presenter || new MarketplacePresenter());
    this.$scope = $scope;
    this.pageName = 'marketplace';
    this.translator = TranslatorService.newInstance();
    this.data.filters = [
      {key: 'all', name: this.translator.translate('label_all')},
      {key: 'intensity', name: this.translator.translate('LeftMenu.Intensity')},
      {key: 'distribution', name: this.translator.translate('LeftMenu.Distribution')},
      {key: 'conversion', name: this.translator.translate('LeftMenu.Conversion')}
    ];
    this.data.selectedFilter = this.data.filters[0];
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

    self.fn.filterWidgetsByCategory = function(category) {
      self.data.selectedFilter = category;
      self.event.filterWidgetsByCategory(category).then(self.onWidgetsLoaded.bind(this));
    };

    this.show();
  };

  MarketplaceView.newInstance = function ($scope) {
    var view = new MarketplaceView($scope);
    return view._injectAspects();
  };

  return MarketplaceView;
});
