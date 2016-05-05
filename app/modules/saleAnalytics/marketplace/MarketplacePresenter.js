define([
    'modules/saleAnalytics/marketplace/MarketplaceModel'
], function (MarketplaceModel) {
    'use strict';

    function MarketplacePresenter(model) {
        this.model = model || new MarketplaceModel();
    }

    MarketplacePresenter.prototype.show = function ($view) {
        var view = $view
        var model = this.model;

        view.event = view.event || {};
    };

    return MarketplacePresenter;
});
