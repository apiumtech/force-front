/**
 * Created by justin on 12/17/14.
 */
define([
    'modules/saleAnalytics/distribution/DistributionModel'
], function (DistributionModel) {
    'use strict';

    function DistributionPresenter(model) {
        this.model = model || new DistributionModel();
    }

    DistributionPresenter.prototype.show = function ($view) {
        var view = $view,
            model = this.model;

        view.event.onLoaded = function () {
            model.getWidgets()
                .then(view.onWidgetsLoaded.bind(view), view.onWidgetsLoadFail.bind(view));
        };

        view.event.onWidgetDropped = function (element, widget) {
            view.updateWidgetSize(element, widget);
        };

        view.event.onWidgetMoved = function (widget, newIndex) {
            model.moveWidget(widget, newIndex);
            model.updateWidgets()
                .then(view.onWidgetsUpdated.bind(view), view.onWidgetsUpdatedFail.bind(view));
        };
    };

    DistributionPresenter.newInstance = function () {
        return new DistributionPresenter();
    };

    return DistributionPresenter;
});