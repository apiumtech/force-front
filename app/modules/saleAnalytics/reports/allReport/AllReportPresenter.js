define([
    'modules/saleAnalytics/reports/allReport/AllReportModel'
], function (AllReportModel) {
    'use strict';

    function AllReportPresenter(model) {
        this.model = model || new AllReportModel();
    }

    AllReportPresenter.prototype = Object.create(Object.prototype, {});

    AllReportPresenter.prototype.show = function (view) {
        var self = this;
        this.view = view;

        view.event.onReloading = function () {
            self._executeLoadWidget();
        };

        view.event.onLoadReports = function () {
            self._executeLoadWidget();
        };

        view.event.onUsersFilterApplied = function (filterValue) {
            self.model.addUserFilter(filterValue);
            view.reloadReports();
        };
    };

    AllReportPresenter.prototype._executeLoadWidget = function(){
        var self = this;
        self.model.reloadWidget()
            .then(self.view.onReportsLoaded.bind(self.view), self.view.showError.bind(self.view));
    };

    return AllReportPresenter;
});