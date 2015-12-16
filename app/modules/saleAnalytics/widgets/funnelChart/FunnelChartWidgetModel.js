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
        /*return Q.fcall(function () {
            return {
                "Series": [
                    {
                        "Name": "",
                        "Points": [
                            {"Y": 1750},
                            {"Y": 230},
                            {"Y": 60},
                            {"Y": 50},
                            {"Y": 30},
                            {"Y": 10}
                        ]
                    }
                ],
                "Labels": [[
                    "Creadas en periodo y asignadas al/los usuarios",
                    "Creadas en periodo con llamada, email o visita",
                    "Creadas en periodo con visita",
                    "Creadas en periodo con oportunidades",
                    "Creadas en periodo con oportunidades >80%",
                    "Creadas en periodo con oportunidades ganadas"
                ]]
            };
        });*/
        return this._baseReload();
    };

    FunnelChartWidgetModel.newInstance = function (ajaxService) {
        return new FunnelChartWidgetModel(ajaxService || AjaxService.newInstance());
    };

    return FunnelChartWidgetModel;
});