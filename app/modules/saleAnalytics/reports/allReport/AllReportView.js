define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter',
    'shared/services/ArrayHelper',
    'underscore'
], function (ReportTabBaseView, AllReportPresenter, ArrayHelper, _) {
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
            if (isOpeningFolder){return;}
            self.isLoading = true;
            self.event.onReloading();
        };

        self.reportEventBus.onAllReportTabSelected(self.fn.loadReports);
        self.reportEventBus.onFolderReportSelected(self.openReport.bind(self));
        self.reportEventBus.onReportSelected(self.openReport.bind(self));

        /*self.reportEventBus.onSearchActivated(function(searchQuery){
          var arrayHelper = self.arrayHelper;

          var cloned = JSON.parse(self.serializedReports);
          var flattened = arrayHelper.flatten(cloned, 'children');

          var filtered = flattened.filter(function(report){
            return report.Type === 'folder' ||
              (report.Type === 'report' &&
                (report.Description.indexOf(searchQuery) > -1 || report.Name.indexOf(searchQuery) > -1)
              );
          });

          self.reports = arrayHelper.makeTree(filtered, 'IdParent', 'Id', 'children', -1);

          // open all search results parent folders
          filtered.filter(function(report) {
            return report.Type === 'report';
          })
          .forEach(function(report) {
            var nodeHasParent = function(node){
              return node && node.IdParent !== -1;
            };
            var currentNode = report;
            while(nodeHasParent(currentNode)){
              self.openReport(currentNode.IdParent);
              currentNode = _.findWhere(filtered, {Id:currentNode.IdParent});
            }
          });
        });*/

        self.reportEventBus.onSearchActivated(function(searchQuery){
          var arrayHelper = self.arrayHelper;

          var cloned = JSON.parse(self.serializedReports);
          var flattened = arrayHelper.flatten(cloned, 'children');

          var matchingReports = flattened.filter(function(report){
            return report.Type === 'report' && (report.Description.indexOf(searchQuery) > -1 || report.Name.indexOf(searchQuery) > -1);
          });

          var matchingReportsFolders = [];
          matchingReports.forEach(function(report) {
            var nodeHasParent = function(node){
              return node && node.IdParent !== -1;
            };
            var currentNode = report;
            while(nodeHasParent(currentNode)){
              currentNode = _.findWhere(flattened, {Id:currentNode.IdParent});
              if(matchingReportsFolders.indexOf(currentNode) === -1){
                matchingReportsFolders.push(currentNode);
              }
            }
          });

          self.reports = arrayHelper.makeTree(matchingReports.concat(matchingReportsFolders), 'IdParent', 'Id', 'children', -1);

          // open all search results parent folders
          matchingReportsFolders.forEach(function(folder) {
            self.openReport(folder.Id);
          });
        });

        self.reportEventBus.onSearchDeactivated(function(){
          self.reports = JSON.parse(self.serializedReports);
        });
    };

    AllReportView.prototype.onReportsLoaded = function (reports) {
        this.serializedReports = JSON.stringify(reports);
        this.reports = reports;
        this.isLoading = false;
    };

    AllReportView.prototype.openReport = function (id) {
        if (!id){return;}

        var self = this;
        var arrayHelper = self.arrayHelper;

        var cloned = arrayHelper.clone(self.reports);
        var flattened = arrayHelper.flatten(cloned, 'children');

        flattened.map(function (f) {
            return f.selected = false;
        });

        var parents = arrayHelper.findParents(flattened, "IdParent", "Id", id, -1);

        parents.forEach(function (p) {
            if (p.Id === id && p.Type === "folder") {
                p.selected = true;
                p.isOpen = true;
            }
            else if(p.Id === id && p.Type === "report"){
                p.selected = true;
            }
            else {
                p.isOpen = true;
            }
        });

        self.reports = arrayHelper.makeTree(flattened, 'IdParent', 'Id', 'children', -1);
    };


    AllReportView.prototype.showError = function (error) {
        window.console.error(error);
    };

    AllReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new AllReportPresenter();
        var view = new AllReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };


    return AllReportView;
});
