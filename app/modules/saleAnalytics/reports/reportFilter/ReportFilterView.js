define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/ReportEventBus',
    'modules/saleAnalytics/reports/reportFilter/ReportFilterPresenter'
], function (BaseView, ReportEventBus, ReportFilterPresenter) {
    'use strict';

    function ReportFilterView($scope, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
        this.reportEventBus = ReportEventBus.getInstance();
        this.searchQuery = "";
        this.configureEvents();
    }

    ReportFilterView.prototype = Object.create(BaseView.prototype, {
        searchQuery: {
            get: function () {
                return this.$scope.searchQuery;
            },
            set: function (value) {
                this.$scope.searchQuery = value;
            }
        }
    });

    ReportFilterView.prototype.configureEvents = function () {
        var self = this;

        self.fn.activateSearch = function () {
            self.reportEventBus.fireSearchActivated(self.searchQuery);
        };

        self.fn.deactivateSearch = function () {
            self.searchQuery = "";
            self.reportEventBus.fireSearchDeactivated();
        };
    };

    ReportFilterView.newInstance = function ($scope, $presenter, $viewRepaintAspect, $logErrorAspect) {
        var view = new ReportFilterView($scope, $presenter);

        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportFilterView;
});