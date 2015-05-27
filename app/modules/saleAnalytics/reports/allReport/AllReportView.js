define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter'
], function (ReportTabBaseView, AllReportPresenter) {
    'use strict';

    function AllReportView($scope, $presenter, eventBus) {
        ReportTabBaseView.call(this, $scope, $presenter, eventBus);
        this.reports = [];
        this.isLoading = false;
        this.configureEvents();
    }

    AllReportView.prototype = Object.create(ReportTabBaseView.prototype, {
        searchQuery: {
            get: function () {
                return this.$scope.searchQuery;
            },
            set: function (value) {
                this.$scope.searchQuery = value;
            }
        }
    });

    AllReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.loadReports = function () {
            self.isLoading = true;
            self.event.onLoadReports();
        };

        self.reportEventBus.onAllReportTabSelected(self.fn.loadReports);
    };

    AllReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        this.isLoading = false;
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