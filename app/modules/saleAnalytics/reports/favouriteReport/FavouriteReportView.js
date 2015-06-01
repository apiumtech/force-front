define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/favouriteReport/FavouriteReportPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (ReportTabBaseView, FavouriteReportPresenter, ReportEventBus) {
    'use strict';

    function FavouriteReportView($scope, $presenter) {
        ReportTabBaseView.call(this, $scope, $presenter);
        this.reportEventBus = ReportEventBus.getInstance();
        this.configureEvents();
    }

    FavouriteReportView.inherits(ReportTabBaseView, {});

    FavouriteReportView.prototype.configureEvents = function () {
        this.__base__.configureEvents.call(this);
        var self = this;

        self.fn.loadReports = function () {
            self.isLoading = true;
            self.event.onLoadReports();
        };

        self.event.onDateFilterApplied = function (filterValue) {

        };
        self.reportEventBus.onFavReportTabSelected(self.fn.loadReports);
    };

    FavouriteReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        this.isLoading = false;
    };

    FavouriteReportView.prototype.showError = function (error) {
        console.error(error);
    };

    FavouriteReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new FavouriteReportPresenter();
        var view = new FavouriteReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    }

    return FavouriteReportView;
});