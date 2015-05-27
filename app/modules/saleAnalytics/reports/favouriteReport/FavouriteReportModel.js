define([
    'shared/services/ajax/FakeAjaxService'
], function (AjaxService) {
    'use strict';

    function FavouriteReportModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    FavouriteReportModel.prototype._getReports = function () {
        return this.ajaxService.rawAjaxRequest({
            result: [
                {
                    id: 1,
                    name: "Analisis IN/OUT",
                    favourite: true,
                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                },
                {
                    id: 2,
                    name: "Oportunidades OUT",
                    favourite: true,
                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                },
                {
                    id: 3,
                    name: "Alalisis Oportunidades",
                    favourite: true,
                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                },
                {
                    id: 4,
                    name: "Analisis Oportunidades IN/OUT",
                    favourite: true,
                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                },
                {
                    id: 5,
                    name: "Analisis Oportunidades OUT",
                    favourite: true,
                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                }

            ]
        }).then(this.decorateServerData.bind(this));
    };

    FavouriteReportModel.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return FavouriteReportModel;
});