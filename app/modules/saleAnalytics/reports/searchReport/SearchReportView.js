define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/searchReport/SearchReportPresenter'
], function (BaseView, SearchReportPresenter) {
    'use strict';

    function SearchReportView($scope, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
    }

    SearchReportView.prototype = Object.create(BaseView.prototype);

    SearchReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new SearchReportPresenter();
        var view = new SearchReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return SearchReportView;
});