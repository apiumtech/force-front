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

        self.fn.toggleFavouriteReport = function () {
            self.report.favourite = !self.report.favourite;
            self.event.toggleFavouriteReport(self.report.id);
        };

        self.fn.download = function () {
            self.event.getReportURL(self.report, self.onURLReceivedForDownload.bind(self));
        };

        self.fn.send = function () {
            self.event.getReportURL(self.report, self.onURLReceivedForSend.bind(self));
        };

    };

    PreviewDialogView.prototype.onURLReceivedForDownload = function (data) {
        var a = document.createElement("A");
        a.href = data.url;
        a.click();
    };

    PreviewDialogView.prototype.onURLReceivedForSend = function (data) {
        var a = document.createElement("A");
        var subject = "Report from Force Manager";
        var body = data.url;
        a.href = "mailto:?subject=" + subject + "&body=" + body + "&html=true";
        a.click();
    };

    PreviewDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new PreviewDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return PreviewDialogView;
});