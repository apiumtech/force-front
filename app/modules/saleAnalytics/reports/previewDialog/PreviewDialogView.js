define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogPresenter'
], function (BaseView, PreviewDialogPresenter) {
    'use strict';

    function PreviewDialogView($scope, $modalInstance, presenter) {
        presenter = presenter || new PreviewDialogPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.$modalInstance = $modalInstance;
        this.configureEvents();
    }

    PreviewDialogView.inherits(BaseView, {
        report: {
            get: function () {
                return this.$scope.report;
            },
            set: function (value) {
                this.$scope.report = value;
            }
        }
    });

    PreviewDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closePreview = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.toggleFavouriteReport = function(){
            self.report.favourite = !self.report.favourite;
            self.event.toggleFavouriteReport(self.report.id);
        }

    };

    PreviewDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new PreviewDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return PreviewDialogView;
});