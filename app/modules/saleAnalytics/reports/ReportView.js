define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView'
], function (WidgetDecoratedPageView) {
    'use strict';

    function ReportView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        this.pageName = 'reports';
        this.displaySearch = false;
    }

    ReportView.prototype = Object.create(WidgetDecoratedPageView.prototype, {
        displaySearch: {
            get: function () {
                return this.$scope.displaySearch;
            },
            set: function (value) {
                this.$scope.displaySearch = value;
            }
        }
    });

    ReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.allReportSelected = function () {
        };
        self.fn.favReportSelected = function () {
        };
        self.fn.searchReportSelected = function () {
        };
    };

    ReportView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var view = new ReportView($scope, $model, $presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ReportView;
});