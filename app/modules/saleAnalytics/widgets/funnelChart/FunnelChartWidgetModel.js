define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'q'
], function (WidgetBase, AjaxService, Q) {
    'use strict';

    function FunnelChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
    }

    FunnelChartWidgetModel.inherits(WidgetBase, {});

    FunnelChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    FunnelChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    FunnelChartWidgetModel.prototype._reload = function () {
        return this._baseReload();
    };

    FunnelChartWidgetModel.newInstance = function (ajaxService) {
        return new FunnelChartWidgetModel(ajaxService || AjaxService.newInstance());
    };

    return FunnelChartWidgetModel;
});