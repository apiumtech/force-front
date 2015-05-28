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
        ReportTabBaseView.prototype.configureEvents.call(this);

        var self = this;

        self.fn.loadReports = function () {
            self.isLoading = true;
            self.event.onLoadReports();
        };

        self.reportEventBus.onAllReportTabSelected(self.fn.loadReports);
        self.reportEventBus.onFolderReportSelected(self.openReportFolder.bind(self));
    };

    AllReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        this.isLoading = false;
    };

    AllReportView.prototype.openReportFolder = function (selectedFolder) {
        console.log("Opening report folder:", selectedFolder);

        if (!selectedFolder) return;
        var self = this;
        var arrayHelper = self.arrayHelper;

        var cloned = arrayHelper.clone(self.reports);
        var flattened = arrayHelper.flatten(cloned, 'children');

        var nodeToCheck = _.find(flattened, function (n) {
            return n.id === selectedFolder
        });

        var parents = arrayHelper.findParents(flattened, "idParent", "id", selectedFolder, -1);

        parents.forEach(function (p) {
            p.isOpen = true;
        });

        self.reports = arrayHelper.makeTree(flattened, 'idParent', 'id', 'children', -1);
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