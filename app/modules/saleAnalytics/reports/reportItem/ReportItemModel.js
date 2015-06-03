define([
    'shared/services/ajax/FakeAjaxService',
    'modules/saleAnalytics/reports/ReportService'
], function (AjaxService, ReportService) {
    'use strict';

    function ReportItemModel(ajaxService, reportService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportItemModel.prototype.toggleFavouriteReport = function (reportId) {
        this.reportService.toggleFavouriteReport(reportId);
    };

    ReportItemModel.prototype.saveName = function (id, newName) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                name: newName,
                id: id
            }
        });
    };

    ReportItemModel.prototype.saveDescription = function (id, newDescription) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                description: newDescription,
                id: id
            }
        });
    };

    ReportItemModel.prototype.getParameters = function (reportId) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                params: [
                    {
                        id: 'account_filter',
                        type: 'textbox',
                        label: 'Account',
                        value: ['Stephanie', 'Julien', 'Daniel', 'Victoria']
                    },
                    {
                        id: 'age_filter',
                        type: 'number-range',
                        label: 'Age',
                        value: "20-50"
                    },
                    {
                        id: 'signup_date_filter',
                        type: 'date',
                        label: 'Signed up date',
                        value: ""
                    },
                    {
                        id: 'range_date_filter',
                        label: 'A range of date',
                        type: 'date',
                        value: "05/20/2014, 05/20/2015"
                    }
                ]

            }
        });
    };

    ReportItemModel.prototype.getReportURL = function (reportId, callback) {
        return this.reportService.getReportURL(reportId).then(callback);
    };

    return ReportItemModel;
});