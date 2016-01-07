/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'config',
    'underscore'
], function (WidgetBase, AuthAjaxService, Configuration, _) {
    'use strict';

    function ScatterChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

    }

    ScatterChartWidgetModel.inherits(WidgetBase, {});

    ScatterChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    ScatterChartWidgetModel.prototype._reload = function (tooltipGenerator) {
        return this._baseReload();
    };

    ScatterChartWidgetModel.newInstance = function (ajaxService) {
        return new ScatterChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return ScatterChartWidgetModel;
});