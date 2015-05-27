define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/AwaitHelper'
], function (WidgetDecoratedPageView, ReportEventBus, AwaitHelper) {
    'use strict';

    function ReportView($scope, $presenter) {
        this.reportEventBus = ReportEventBus.getInstance();
        this.awaitHelper = AwaitHelper.getInstance();
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'reports';
        this.displaySearch = false;
        this.searchTabActivated = false;
        this.queryString = "";
    }

    ReportView.prototype = Object.create(WidgetDecoratedPageView.prototype, {
        displaySearch: {
            get: function () {
                return this.$scope.displaySearch;
            },
            set: function (value) {
                this.$scope.displaySearch = value;
            }
        },
        queryString: {
            get: function () {
                return this.$scope.queryString;
            },
            set: function (value) {
                this.$scope.queryString = value;
            }
        },
        searchTabActivated: {
            get: function () {
                return this.$scope.searchTabActivated;
            },
            set: function (value) {
                this.$scope.searchTabActivated = value;
            }
        }
    });

    ReportView.prototype.show = function () {
        WidgetDecoratedPageView.prototype.show.call(this);
        var self = this;
        self.fn.allReportSelected();
    };

    ReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.allReportSelected = function () {
            self.searchTabActivated = false;
            self.reportEventBus.fireAllReportTabSelected();
        };

        self.fn.favReportSelected = function () {
            self.searchTabActivated = false;
            self.reportEventBus.fireFavReportTabSelected();
        };

        self.fn.delaySearch = function (searchQuery) {
            self.awaitHelper.await(self.fn.searchReportSelected.bind(self, searchQuery), 10);
        };

        self.fn.searchReportSelected = function (searchQuery) {
            self.searchTabActivated = true;
            self.displaySearch = true;
            self.reportEventBus.fireSearchReportTabSelected(searchQuery);
        };

        self.fn.removeSearchTab = function () {
            self.searchTabActivated = false;
            self.displaySearch = false;
        };

        self.reportEventBus.onSearchActivated(self.fn.delaySearch);
        self.reportEventBus.onSearchDeactivated(self.fn.removeSearchTab);
    };

    ReportView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {
        var view = new ReportView($scope, $presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ReportView;
});