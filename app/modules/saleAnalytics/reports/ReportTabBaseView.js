define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (BaseView, ReportEventBus) {
    'use strict';

    function ReportTabBaseView(scope, presenter) {
        BaseView.call(this, scope, null, presenter);
        this.reportEventBus = ReportEventBus.getInstance();
    }

    ReportTabBaseView.prototype = Object.create(BaseView.prototype, {
        reports: {
            get: function () {
                return this.$scope.reports;
            },
            set: function (value) {
                this.$scope.reports = value;
            }
        }
    });

    return ReportTabBaseView;
});