define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/ArrayHelper'
], function (BaseView, ReportItemPresenter, ReportEventBus, ArrayHelper) {
    'use strict';

    function ReportItemView($scope, $element, $presenter, eventBus) {
        $presenter = $presenter || new ReportItemPresenter();
        BaseView.call(this, $scope, null, $presenter);
        this.element = $element;
        this.originalName = "";
        this.originalDescription = "";
        this.reportEventBus = eventBus || ReportEventBus.getInstance();
        var modalService = $scope.$modal;

        this.modalService = modalService;
        this.configureEvents();
    }

    ReportItemView.inherits(BaseView, {
        report: {
            get: function () {
                return this.$scope.report;
            }
        },
        nameError: {
            get: function () {
                return this.$scope.nameError;
            },
            set: function (value) {
                this.$scope.nameError = value;
            }
        },
        descriptionError: {
            get: function () {
                return this.$scope.descriptionError;
            },
            set: function (value) {
                this.$scope.descriptionError = value;
            }
        },
        editingName: {
            get: function () {
                return this.$scope.editingName;
            },
            set: function (value) {
                this.$scope.editingName = value;
            }
        },
        editingDescription: {
            get: function () {
                return this.$scope.editingDescription;
            },
            set: function (value) {
                this.$scope.editingDescription = value;
            }
        },
        fireOpenFolder: {
            get: function () {
                return this.$scope.fireOpenFolder;
            },
            set: function (value) {
                this.$scope.fireOpenFolder = value;
            }
        },
        selectedReportType: {
            get: function () {
                return this.$scope.selectedReportType;
            },
            set: function (value) {
                this.$scope.selectedReportType = value;
            }
        }
    });

    ReportItemView.prototype.configureEvents = function () {
        var self = this;

        this.selectedReportType = this.report && this.report.reportType ? this.report.reportType[0] : '';

        self.fn.startEditingName = function () {
            self.originalName = self.report.name;
            self.editingName = true;
        };

        self.fn.saveName = function () {
            if (!self.report.name) {
                self.nameError = "Name cannot be empty";
            } else {
                self.nameError = "";
                self.event.onSaveName(self.report.id, self.report.name);
            }
        };

        self.fn.sendFolderReportOpenCommand = function (item) {
            if (!self.fireOpenFolder || item.type !== 'folder') return;
            var folderId = item.id;

            self.reportEventBus.fireFolderReportSelected(folderId);
        };

        self.fn.cancelEditingName = function () {
            self.nameError = "";
            self.report.name = self.originalName;
            self.editingName = false;
        };

        self.fn.startEditingDescription = function () {
            self.originalDescription = self.report.description;
            self.editingDescription = true;
        };

        self.fn.saveDescription = function () {
            if (!self.report.description) {
                self.descriptionError = "Description cannot be empty";
            } else {
                self.descriptionError = "";
                self.event.onSaveDescription(self.report.id, self.report.description);
            }
        };

        self.fn.cancelEditingDescription = function () {
            self.descriptionError = "";
            self.report.description = self.originalDescription;
            self.editingDescription = false;
        };

        self.fn.changeReportType = function (selectedReportType) {
            self.selectedReportType = selectedReportType;
        };

        self.fn.toggleFavouriteReport = function () {
            self.report.favourite = !self.report.favourite;
            self.event.toggleFavouriteReport(self.report.id);
        };

        self.fn.preview = function () {
            self.event.getParameters(self.report.id, self.onParameterLoadedForPreview.bind(self));
        };

        self.fn.send = function () {
            self.event.getParameters(self.report.id, self.onParameterLoadedForSend.bind(self));
        };

        self.fn.download = function () {
            self.event.getParameters(self.report.id, self.onParameterLoadedForDownload.bind(self));
        };

        self.fn.openPreviewDialog = function () {
            self.modalService.open({
                templateUrl: 'app/modules/saleAnalytics/reports/previewDialog/previewDialog.html',
                windowTemplateUrl: 'app/modules/saleAnalytics/reports/previewDialog/previewDialogWindow.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'PreviewDialogController',
                resolve: {
                    report: function () {
                        return self.report;
                    }
                }
            });
        };

        self.fn.openParamsDialog = function (callback) {

            var paramDialog = self.modalService.open({
                templateUrl: 'app/modules/saleAnalytics/reports/reportParamsDialog/reportParamDialog.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'ReportParamsDialogController',
                resolve: {
                    report: function () {
                        return ArrayHelper.clone(self.report);
                    },
                    paramConfig: function (){
                        return self.report.paramConfig
                    }
                }
            });

            paramDialog.result.then(callback, function(){});
        };

    };

    ReportItemView.prototype.onParameterLoadedForPreview = function (data) {
        var self = this;
        self.report.paramConfig = data.params;
        if (!self.report.paramConfig || self.report.paramConfig.length <= 0) {
            self.fn.openPreviewDialog();
        }
        else {
            self.fn.openParamsDialog(self.onParameterSetForPreview.bind(self));
        }
    };

    ReportItemView.prototype.onParameterLoadedForSend = function (data) {
        var self = this;
        self.report.paramConfig = data.params;
        if (!self.report.paramConfig || self.report.paramConfig.length <= 0) {
            self.event.getReportURL(self.report, self.onReportURLLoadedForSend.bind(self));
        }
        else {
            // call modal of parameters
        }
    };

    ReportItemView.prototype.onParameterLoadedForDownload = function (data) {
        var self = this;
        self.report.paramConfig = data.params;
        if (!self.report.paramConfig || self.report.paramConfig.length <= 0) {
            self.event.getReportURL(self.report, self.onReportURLLoadedForDownload.bind(self));
        }
        else {
            // call modal of parameters
            // close modal -> call sth
        }
    };

    ReportItemView.prototype.onReportURLLoadedForSend = function (data) {
        var self = this;
        self.report.url = data.url;
        var a = document.createElement("A");
        var subject = "Report from Force Manager";
        var body = encodeURIComponent(self.report.url);
        a.href = "mailto:?subject=" + subject + "&body=" + body + "&html=true";
        a.click();
    };


    ReportItemView.prototype.onReportURLLoadedForDownload = function (data) {
        var self = this;
        self.report.url = data.url;
        var a = document.createElement("A");
        a.href = self.report.url;
        a.click();
    };

    ReportItemView.prototype.onParameterSetForPreview = function(data){
        var self = this;

        self.report.params = data.params;
        self.fn.openPreviewDialog();
    };

    ReportItemView.prototype.onSaveNameSuccess = function (data) {
        this.report.name = data.name;
        this.editingName = false;
    };

    ReportItemView.prototype.onSaveNameError = function (data) {
    };

    ReportItemView.prototype.onSaveDescriptionSuccess = function (data) {
        this.report.description = data.description;
        this.editingDescription = false;
    };

    ReportItemView.prototype.onSaveDescriptionError = function (data) {

    };

    ReportItemView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {

        var view = new ReportItemView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});