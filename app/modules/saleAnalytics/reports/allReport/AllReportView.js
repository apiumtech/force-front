define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (BaseView, AllReportPresenter, ReportEventBus) {
    'use strict';

    function AllReportView($scope, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
        this.reportEventBus = ReportEventBus.getInstance();
        this.configureEvents();
    }

    AllReportView.prototype = Object.create(BaseView.prototype, {
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

    AllReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.loadReports = function () {
            self.event.onLoadReports();
        };

        self.reportEventBus.onAllReportTabSelected(self.fn.loadReports);
    };

    AllReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        console.log("view", reports);
    };



    AllReportView.prototype.showError = function (error) {
        console.error(error);
    };

    AllReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new AllReportPresenter();
        var view = new AllReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };


    return AllReportView;
});