define([
    'modules/saleAnalytics/reports/reportItem/ReportItemModel'
], function (ReportItemModel) {
    'use strict';

    function ReportItemPresenter(model) {
        this.model = model || new ReportItemModel();
    }

    ReportItemPresenter.prototype.show = function (view) {
        var self = this;
        self.view = view;

        view.event.onSaveName = function (reportId, reportName) {
            self.model.saveName(reportId, reportName)
                .then(view.onSaveNameSuccess.bind(view), view.onSaveNameError.bind(view));
        };

        view.event.onSaveDescription = function (reportId, reportDescription) {
            self.model.saveDescription(reportId, reportDescription)
                .then(view.onSaveDescriptionSuccess.bind(view), view.onSaveDescriptionError.bind(view));
        };
    };

    return ReportItemPresenter;
});