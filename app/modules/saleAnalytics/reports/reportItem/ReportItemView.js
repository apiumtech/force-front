define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter'
], function (BaseView, ReportItemPresenter) {
    'use strict';

    function ReportItemView($scope, $element, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
        this.element = $element;
        this.configureEvents();
    }

    ReportItemView.prototype = Object.create(BaseView.prototype, {});

    ReportItemView.prototype.configureEvents = function(){

    };

    ReportItemView.newInstance = function ($scope, $element, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $presenter = $presenter || new ReportItemPresenter();

        var view = new ReportItemView($scope, $element, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});