/**
 * Created by justin on 12/17/14.
 */
define([
    'modules/saleAnalytics/intensity/IntensityModel'
], function (IntensityModel) {
    'use strict';

    function IntensityPresenter(model) {
        this.model = model || new IntensityModel();
    }

    IntensityPresenter.prototype.show = function ($view) {
        var view = $view,
            model = this.model;

        view.event = view.event || {};

        view.event.onLoaded = function () {
            model.getWidgets()
                .then(view.onWidgetsLoaded.bind(view), view.onWidgetsLoadFail.bind(view));
        };

        view.event.onWidgetDropped = function (element, widget) {
            view.updateWidgetIndex(element, widget);
        };

        view.event.onWidgetMoved = function (widget, newIndex) {
            model.moveWidget(widget, newIndex);
            model.updateWidgets()
                .then(view.onWidgetsUpdated.bind(view), view.onWidgetsUpdatedFail.bind(view));
        };
    };

    return IntensityPresenter;
});