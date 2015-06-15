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
        this.modalService = $scope.$modal;
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
        },
        inProgress: {
            get: function () {
                return this.$scope.inProgress;
            },
            set: function (value) {
                this.$scope.inProgress = value;
            }
        },
        otherReportInProgress: {
            get: function () {
                return this.$scope.otherReportInProgress;
            },
            set: function (value) {
                this.$scope.otherReportInProgress = value;
            }
        }
    });

    ReportItemView.prototype.configureEvents = function () {
        var self = this;

        this.selectedReportType = this.report && this.report.reportType ? this.report.reportType[0] : '';

        self.fn.startEditingName = function () {
            if(self.fireOpenFolder) return;
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
            console.log("sending open folder command", item);
            self.reportEventBus.fireFolderReportSelected(folderId);
        };

        self.fn.sendReportOpenCommand = function (item) {
            if (!self.fireOpenFolder || item.type !== 'report') return;
            console.log("sending", item);
            var id = item.id;
            self.reportEventBus.fireReportSelected(id);
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
            self.inProgress = true;
            self.currentActionForEmptyOrAssignedParameters = function () {
                self.previewReport.call(self);
            };
            self.currentActionForParameters = function (params) {
                self.configureParameters.call(self, params);
            };
            self.getParameterConfiguration();
        };

        self.fn.send = function () {
            self.inProgress = true;

            self.currentActionForEmptyOrAssignedParameters = function () {
                self.sendReport.call(self);
            };
            self.currentActionForParameters = function (params) {
                self.configureParameters.call(self, params);
            };
            self.getParameterConfiguration();
        };

        self.fn.download = function () {
            self.inProgress = true;

            self.currentActionForEmptyOrAssignedParameters = function () {
                self.downloadReport.call(self);
            };
            self.currentActionForParameters = function (params) {
                self.configureParameters.call(self, params);
            };
            self.getParameterConfiguration();
        };

        self.reportEventBus.onReportIsInProgress(self.onOtherReportInProgressStateChange.bind(self));
    };

    ReportItemView.prototype.onOtherReportInProgressStateChange = function (reportId, state) {
        var self = this;
        if (reportId === self.report.id) return;
        self.otherReportInProgress = state;
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

    ReportItemView.prototype.openParamsDialog = function (callback) {
        var self = this;
        var paramDialog = self.modalService.open({
            templateUrl: 'app/modules/saleAnalytics/reports/reportParamsDialog/reportParamDialog.html',
            backdrop: 'static',
            keyboard: false,
            controller: 'ReportParamsDialogController',
            resolve: {
                report: function () {
                    return ArrayHelper.clone(self.report);
                },
                parameterConfigurations: function () {
                    return self.report.parameterConfigurations;
                }
            }
        });

        paramDialog.result.then(callback, function () {
        });
    };

    ReportItemView.prototype.getParameterConfiguration = function () {
        var self = this;
        self.reportEventBus.fireReportIsInProgress(self.report.id, true);
        self.event.getParameterConfiguration(self.report.id, self.onParameterConfigurationLoaded.bind(self));
    };

    ReportItemView.prototype.onParameterConfigurationLoaded = function (data) {
        var self = this;
        self.report.parameterConfigurations = data.params;
        if (!self.report.parameterConfigurations || self.report.parameterConfigurations.length <= 0) {
            self.currentActionForEmptyOrAssignedParameters();
        }
        else {
            self.currentActionForParameters(data.params);
        }
        self.inProgress = false;
        self.reportEventBus.fireReportIsInProgress(self.report.id, false);
    };

    ReportItemView.prototype.configureParameters = function (parameterConfigurations) {
        var self = this;
        self.report.parameterConfigurations = parameterConfigurations;
        self.openParamsDialog(self.onParameterSet.bind(self));
    };

    ReportItemView.prototype.previewReport = function () {
        var self = this;
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

    ReportItemView.prototype.sendReport = function () {
        var self = this;
        self.event.getReportURL(self.report, self.onReportURLLoadedForSend.bind(self));
    };

    ReportItemView.prototype.downloadReport = function () {
        var self = this;
        self.event.getReportURL(self.report, self.onReportURLLoadedForDownload.bind(self));
    };

    ReportItemView.prototype.onReportURLLoadedForSend = function (data) {
        var a = document.createElement("A");
        var subject = "Report from Force Manager";
        var body = encodeURIComponent(data.url);
        a.href = "mailto:?subject=" + subject + "&body=" + body + "&html=true";
        a.click();
    };

    ReportItemView.prototype.onReportURLLoadedForDownload = function (data) {
        var a = document.createElement("A");
        a.href = data.url;
        a.click();
    };

    ReportItemView.prototype.onParameterSet = function (data) {
        var self = this;
        self.report.params = data.params;
        self.currentActionForEmptyOrAssignedParameters();
    };

    ReportItemView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {

        var view = new ReportItemView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});