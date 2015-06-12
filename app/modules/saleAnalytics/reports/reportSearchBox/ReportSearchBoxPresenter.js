define([
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxModel'
], function (ReportSearchBoxModel) {
    'use strict';

    function ReportSearchBoxPresenter(model) {
        this.model = model || new ReportSearchBoxModel();
    }

    ReportSearchBoxPresenter.prototype.show = function(view) {
        var self = this;
        self.view = view;
        var model = self.model;

        view.event = view.event || {};

        view.event.onSearch = function(query){
            model.search(query)
                .then(view.onSearchResultLoaded.bind(view), view.showError.bind(view));
        };
    };

    return ReportSearchBoxPresenter;
});