define([
    'shared/services/ajax/FakeAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config',
    'moment'
], function (AjaxService, WidgetBase, Configuration, moment) {
    'use strict';

    function AllReportModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        WidgetBase.call(this, this.ajaxService);
        this.queries = {
            user: "",
            permission: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    AllReportModel.prototype = Object.create(WidgetBase.prototype, {});

    AllReportModel.prototype.reloadWidget = function(){
        return this._reload();
    }

    AllReportModel.prototype._reload = function () {
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
