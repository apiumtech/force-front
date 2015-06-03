define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/AwaitHelper',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogController',
    'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogController'
], function (WidgetDecoratedPageView, ReportEventBus, AwaitHelper) {
    'use strict';

    function ReportView($scope, $presenter, eventBus) {
        this.reportEventBus = eventBus || ReportEventBus.getInstance();
        this.awaitHelper = AwaitHelper.getInstance();
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'reports';
        this.displaySearch = false;
        this.searchTabActivated = false;
        this.firstTabActivated = true;
        this.queryString = "";
    }

    ReportView.inherits(WidgetDecoratedPageView, {
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
                return this.data.searchTabActivated;
            },
            set: function (value) {
                this.data.searchTabActivated = value;
            }
        },
        firstTabActivated: {
            get: function () {
                return this.data.firstTabActivated;
            },
            set: function (value) {
                this.data.firstTabActivated = value;
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
            if (self.openingFolder == false)
                self.reportEventBus.fireAllReportTabSelected();
        };

        self.fn.favReportSelected = function () {
            self.searchTabActivated = false;
            self.firstTabActivated = false;
            self.openingFolder = false;
            self.reportEventBus.fireFavReportTabSelected();
        };

        self.fn.searchReportSelected = function (searchQuery) {
            self.searchTabActivated = true;
            self.firstTabActivated = false;
            self.displaySearch = true;
            self.openingFolder = false;
            self.reportEventBus.fireSearchReportTabSelected(searchQuery);
        };

        self.fn.removeSearchTab = function () {
            self.firstTabActivated = true;
            self.searchTabActivated = false;
            self.displaySearch = false;
        };

        self.fn._delayOpeningFolder = function () {
            self.awaitHelper.await(self.fn.openFirstTabForOpeningFolder, 20);
        };

        self.fn.openFirstTabForOpeningFolder = self.openFirstTabForOpeningFolder.bind(self);

        self.reportEventBus.onSearchActivated(self.fn.searchReportSelected);
        self.reportEventBus.onSearchDeactivated(self.fn.removeSearchTab);
        self.reportEventBus.onFolderReportSelected(self.fn.openFirstTabForOpeningFolder);
    };

    ReportView.prototype.openFirstTabForOpeningFolder = function () {
        console.log("open folder command received");
        var self = this;
        self.openingFolder = true;
        self.firstTabActivated = true;
        self.searchTabActivated = false;
    };

    ReportView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {
        var view = new ReportView($scope, $presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ReportView;
});