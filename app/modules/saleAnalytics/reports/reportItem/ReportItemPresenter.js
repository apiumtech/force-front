define([
    'modules/saleAnalytics/reports/reportItem/ReportItemModel'
], function (ReportItemModel) {
    'use strict';

    function ReportItemPresenter(model) {
        this.model = model || new ReportItemModel();
    }

    ReportItemPresenter.prototype.show = function (view) {
        this.view = view;
    };

    return ReportItemPresenter;
});