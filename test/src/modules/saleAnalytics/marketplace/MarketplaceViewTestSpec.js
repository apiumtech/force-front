/* global mockAngularScope, spyOn, jasmine */
define([
  'modules/saleAnalytics/marketplace/MarketplaceView',
  'modules/saleAnalytics/marketplace/MarketplacePresenter'
], function (MarketplaceView, MarketplacePresenter) {
  'use strict';

  describe("MarketplaceView", function () {

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
      it("should have 0 filters", function(){
        var view = exerciseView();
        expect(view.data.filters.length).toBe(0);
      });
      it("should set selectedFilter to the first item in the filters list", function(){
        var view = exerciseView();
        view.onGetFilters([{key:'all'}, {key:'none'}]);
        expect(view.data.selectedFilter.key).toBe('all');
      });
      it("should set pageName to 'marketplace'", function(){
        var view = exerciseView();
        expect(view.pageName).toBe('marketplace');
      });
    }); // on construction

  });
});
