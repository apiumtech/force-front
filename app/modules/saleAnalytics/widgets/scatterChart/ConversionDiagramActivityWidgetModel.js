/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (WidgetBase, AuthAjaxService, Configuration) {
    'use strict';

    function ConversionDiagramActivityWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

    }

    ConversionDiagramActivityWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    ConversionDiagramActivityWidgetModel.prototype.getUrl = function () {
        return Configuration.api.activityWidgetConversionDataApi;
    };

    ConversionDiagramActivityWidgetModel.prototype.decorateServerData = function (data) {
        return data;
    };

    ConversionDiagramActivityWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    ConversionDiagramActivityWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    ConversionDiagramActivityWidgetModel.newInstance = function (ajaxService) {
        return new ConversionDiagramActivityWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return ConversionDiagramActivityWidgetModel;
});