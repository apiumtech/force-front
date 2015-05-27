define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (WidgetDecoratedPageView, ReportEventBus) {
    'use strict';

    function ReportView($scope, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'reports';
        this.displaySearch = false;
        this.queryString = "";
        this.reportEventBus = ReportEventBus.getInstance();
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
            self.reportEventBus.fireAllReportTabSelected();
        };
        self.fn.favReportSelected = function () {

        };
        self.fn.searchReportSelected = function () {

        };
    };

    ReportView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {
        var view = new ReportView($scope, $presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ReportView;
});