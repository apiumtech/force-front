define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (BaseView, ReportEventBus) {
    'use strict';

    function ReportTabBaseView(scope, presenter, eventBus) {
        BaseView.call(this, scope, null, presenter);
        this.reportEventBus = eventBus || ReportEventBus.getInstance();
    }

    ReportTabBaseView.prototype = Object.create(BaseView.prototype, {
        reports: {
            get: function () {
                return this.$scope.reports;
            },
            set: function (value) {
                this.$scope.reports = value;
            }
        },
        isLoading: {
            get: function () {
                return this.$scope.isLoading;
            },
            set: function (value) {
                this.$scope.isLoading = value;
            }
        }
    });

    return ReportTabBaseView;
});