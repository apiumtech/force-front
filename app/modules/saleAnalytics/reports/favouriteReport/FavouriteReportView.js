define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/favouriteReport/FavouriteReportPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (BaseView, FavouriteReportPresenter, ReportEventBus) {
    'use strict';

    function FavouriteReportView($scope, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
        this.reportEventBus = ReportEventBus.getInstance();
        this.configureEvents();
    }

    FavouriteReportView.prototype = Object.create(BaseView.prototype, {
        reports: {
            get: function () {
                return this.$scope.reports;
            },
            set: function (value) {
                this.$scope.reports = value;
            }
        }
    });

    FavouriteReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.loadReports = function () {
            self.event.onLoadReports();
        };

        self.reportEventBus.onFavReportTabSelected(self.fn.loadReports);
    };

    FavouriteReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        console.log("favouriteview", reports);
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