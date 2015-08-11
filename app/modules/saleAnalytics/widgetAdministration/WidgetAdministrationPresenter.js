define([
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationModel'
], function (WidgetAdministrationModel) {
    'use strict';

    function WidgetAdministrationPresenter(model) {
        this.model = model || new WidgetAdministrationModel();
    }

    WidgetAdministrationPresenter.prototype.show = function(view) {

    };

    return WidgetAdministrationPresenter;
});