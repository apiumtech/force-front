define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogPresenter',
    'jquery'
], function (BaseView, PreviewDialogPresenter, $) {
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
        },
        images: {
            get: function () {
                return this.$scope.images;
            },
            set: function (value) {
                this.$scope.images = value;
            }
        },
        processingFavourite: {
            get: function () {
                return this.$scope.processingFavourite;
            },
            set: function (value) {
                this.$scope.processingFavourite = value;
            }
        }
    });

    PreviewDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closePreview = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.init = function(){
            self.inProgress();
            self.event.onLoadingTablePreview(self.report);
        };

        self.fn.toggleFavouriteReport = function () {
            self.processingFavourite = true;
            self.event.toggleFavouriteReport(self.report.Id);
        };

        self.fn.download = function () {
            self.event.getReportURL(self.report, self.onURLReceivedForDownload.bind(self), self.onURLReceivedError.bind(self));
        };

        self.fn.send = function () {
            self.event.getReportURL(self.report, self.onURLReceivedForSend.bind(self), self.onURLReceivedError.bind(self));
        };

        self.fn.expandDescription = function () {
            $('.modal-title-description').toggleClass('with-ellipsis');
        };

    };

    PreviewDialogView.prototype.inProgress = function(){
        var self = this;
        self.data.inProgress = true;
        self.data.tableReportData = [];
    };

    PreviewDialogView.prototype.onPreviewImageLoaded = function(data){
        var self = this;
        self.images = data;
    };


    PreviewDialogView.prototype.onTablePreviewLoaded = function(data){
        var self = this;
        self.data.tableReportData = data;
        self.data.inProgress = false;
    };

    PreviewDialogView.prototype.onToggledFavouriteReport = function(){
        var self = this;
        self.report.Favorite = !self.report.Favorite;
        self.processingFavourite = false;
    };

    PreviewDialogView.prototype.onURLReceivedForDownload = function (data) {
        var a = document.createElement("A");
        a.href = data;
        a.click();
    };

    PreviewDialogView.prototype.onURLReceivedError = function (err) {
        window.console.error(err);
        this.data.inProgress = false;
    };

    PreviewDialogView.prototype.onURLReceivedForSend = function (data) {
        var a = document.createElement("A");
        var subject = "Report from Force Manager";
        var body = data;
        a.href = "mailto:?subject=" + subject + "&body=" + body + "&html=true";
        a.click();
    };

    PreviewDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new PreviewDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return PreviewDialogView;
});
