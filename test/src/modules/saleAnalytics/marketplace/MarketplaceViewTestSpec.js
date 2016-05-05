/* global mockAngularScope, spyOn, jasmine */
define([
  'modules/saleAnalytics/marketplace/MarketplaceView',
  'modules/saleAnalytics/marketplace/MarketplacePresenter'
], function (MarketplaceView, MarketplacePresenter) {
  'use strict';

  ddescribe("MarketplaceView", function () {

    function exerciseView() {
      var mockPermissionsService = {getPermission:function(){}};
      return new MarketplaceView(mockAngularScope(), new MarketplacePresenter(), mockPermissionsService);
    }

    describe('on construction', function () {
      it("should call configureEvents", function () {
        spyOn(MarketplaceView.prototype, 'configureEvents').and.callThrough();
        exerciseView();
        expect(MarketplaceView.prototype.configureEvents).toHaveBeenCalled();
      });
      it("should call show method", function () {
        spyOn(MarketplaceView.prototype, 'show');
        var view = exerciseView();
        expect(view.show).toHaveBeenCalledWith();
      });
      it("should set selectedFilter to 'all'", function(){
        var view = exerciseView();
        expect(view.data.selectedFilter.key).toBe('all');
      });
      it("should have 4 filters", function(){
        var view = exerciseView();
        expect(view.data.filters.length).toBe(4);
      });
      it("should set pageName to 'marketplace'", function(){
        var view = exerciseView();
        expect(view.pageName).toBe('marketplace');
      });
    }); // on construction

  });
});
