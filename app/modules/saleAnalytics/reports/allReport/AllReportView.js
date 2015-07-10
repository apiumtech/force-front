define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter',
    'shared/services/ArrayHelper'
], function (ReportTabBaseView, AllReportPresenter, ArrayHelper) {
    'use strict';

    function AllReportView($scope, $presenter, eventBus) {
        ReportTabBaseView.call(this, $scope, $presenter, eventBus);
        this.reports = [];
        this.isLoading = false;
        this.arrayHelper = ArrayHelper;
        this.configureEvents();
    }

    AllReportView.inherits(ReportTabBaseView, {
        searchQuery: {
            get: function () {
                return this.$scope.searchQuery;
            },
            set: function (value) {
                this.$scope.searchQuery = value;
            }
        },
        pageType: {
            get: function () {
                return this.$scope.pageType;
            },
            set: function (value) {
                this.$scope.pageType = value;
            }
        }
    });

    AllReportView.prototype.configureEvents = function () {
        this.__base__.configureEvents.call(this);

        var self = this;

        self.fn.loadReports = function (isOpeningFolder) {
            if (isOpeningFolder) return;
            self.isLoading = true;
            self.event.onReloading();
        };

        self.reportEventBus.onAllReportTabSelected(self.fn.loadReports);
        self.reportEventBus.onFolderReportSelected(self.openReport.bind(self));
        self.reportEventBus.onReportSelected(self.openReport.bind(self));
    };

    AllReportView.prototype.onReportsLoaded = function (reports) {
        console.log("loaded", reports);
        this.reports = reports;
        this.isLoading = false;
    };

    AllReportView.prototype.openReport = function (id) {
        if (!id) return;

        var self = this;
        var arrayHelper = self.arrayHelper;

        var cloned = arrayHelper.clone(self.reports);
        var flattened = arrayHelper.flatten(cloned, 'children');

        flattened.map(function (f) {
            return f.selected = false;
        });

        var parents = arrayHelper.findParents(flattened, "IdParent", "Id", id, -1);

        parents.forEach(function (p) {
            if (p.Id === id && p.Type == "folder") {
                p.selected = true;
                p.isOpen = true;
            }
            else if(p.Id === id && p.Type == "report"){
                p.selected = true;
            }
            else {
                p.isOpen = true;
            }
        });

        self.reports = arrayHelper.makeTree(flattened, 'IdParent', 'Id', 'children', -1);
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