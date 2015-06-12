define([
    'shared/services/ajax/FakeAjaxService',
    'modules/saleAnalytics/reports/ReportFakeData'
], function (AjaxService, ReportFakeData) {
    'use strict';

    function ReportService(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    ReportService.inherits(Object, {});

    ReportService.prototype.toggleFavouriteReport = function () {
        //TODO: implement when having server's contract
    };

    ReportService.prototype.getReportURL = function (report) {
        //TODO: implement when having server's contract
        return this.ajaxService.rawAjaxRequest({
            result: {
                url: "http://this.is/theURL/we/want/" + report.id

            }
        });
    };

    ReportService.prototype.getParameterConfiguration = function (reportId) {
        //TODO: implement when having server's contract
        return this.ajaxService.rawAjaxRequest({
            result: {
                params: [
                    {
                        id: 'account_name',
                        type: 'textbox',
                        label: 'Account'
                    },
                    {
                        id: 'age',
                        type: 'range',
                        label: 'Age'
                    },
                    {
                        id: 'birthday',
                        type: 'date',
                        label: 'Birthday'
                    },
                    {
                        id: 'report_date',
                        type: 'date_range',
                        label: 'Report Date'
                    },
                    {
                        id: 'report_type',
                        label: 'Type',
                        type: 'selectbox',
                        value: [
                            {
                                key: 'graph',
                                name: 'Graph Report'
                            },
                            {
                                key: 'pie',
                                name: 'Pie Report'
                            },
                            {
                                key: 'map',
                                name: 'Map Report'
                            }
                        ]
                    }
                ]
            }
        });
    };

    ReportService.prototype.getPreviewReportPhotos = function (reportId) {
        //TODO: implement when having server's contract
    };

    ReportService.prototype.searchReport = function(query){
        return this.ajaxService.rawAjaxRequest({
            result: ReportFakeData()
        }).then(this.decorateServerData.bind(this));
    };

    ReportService.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return ReportService;
});