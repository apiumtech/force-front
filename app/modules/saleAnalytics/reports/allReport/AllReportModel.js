define([
    'shared/services/ajax/FakeAjaxService'
], function (AjaxService) {
    'use strict';

    function AllReportModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    AllReportModel.prototype._getReports = function () {
        return this.ajaxService.rawAjaxRequest({
            result: [{
                id: 1,
                name: 'Folder',
                description: '',
                children: [
                    {
                        id: 2,
                        name: "Longtail",
                        description: '',
                        children: [
                            {
                                id: 3,
                                name: "Alalisis Oportunidades",
                                description: "Imforme que muestra riesgo por bajo uso por cliente",
                            },
                            {
                                id: 4,
                                name: "Analisis Oportunidades IN/OUT",
                                description: "Imforme que muestra riesgo por bajo uso por cliente",
                            },
                            {
                                id: 5,
                                name: "Analisis Oportunidades OUT",
                                description: "Imforme que muestra riesgo por bajo uso por cliente",
                            }
                        ]
                    }
                ]
            },
                {
                    id: 1,
                    name: 'Folder',
                    description: '',
                    children: [
                        {
                            id: 2,
                            name: "Longtail",
                            description: '',
                            children: [
                                {
                                    id: 3,
                                    name: "Alalisis Oportunidades",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                },
                                {
                                    id: 4,
                                    name: "Analisis Oportunidades IN/OUT",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                },
                                {
                                    id: 5,
                                    name: "Analisis Oportunidades OUT",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: "Longtail",
                            description: '',
                            children: [
                                {
                                    id: 3,
                                    name: "Alalisis Oportunidades",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                },
                                {
                                    id: 4,
                                    name: "Analisis Oportunidades IN/OUT",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                },
                                {
                                    id: 5,
                                    name: "Analisis Oportunidades OUT",
                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
                                }
                            ]
                        }
                    ]
                }
            ]
        }).then(this.decorateServerData.bind(this));
    };

    AllReportModel.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return AllReportModel;
});
