define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter'
], function (ReportTabBaseView, AllReportPresenter) {
    'use strict';

    function AllReportView($scope, $presenter) {
        ReportTabBaseView.call(this, $scope, $presenter);
        this.reports = [];
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

        self.fn.activeSearch = function () {
            self.reportEventBus.fireSearchReportTabSelected(self.searchQuery);
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