define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/ArrayHelper',
    'shared/services/notification/ToastService',
    'shared/services/TranslatorService',
    'jquery'
], function (BaseView, ReportItemPresenter, ReportEventBus, ArrayHelper, ToastService, TranslatorService, $) {
    'use strict';

    function ReportItemView($scope, $element, $presenter, eventBus) {
        $presenter = $presenter || new ReportItemPresenter();
        BaseView.call(this, $scope, null, $presenter);
        this.element = $element;
        this.originalName = "";
        this.originalDescription = "";
        this.reportEventBus = eventBus || ReportEventBus.getInstance();
        this.modalService = $scope.$modal;
        this.toastService = ToastService.getInstance();
        this.translator = TranslatorService.newInstance();

        this.configureEvents();
    }

    ReportItemView.inherits(BaseView, {
        report: {
            get: function () {
                return this.$scope.report;
            },
            set: function (value) {
                this.$scope.report = value;
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

        this.selectedReportType = this.report && this.report.ReportType ? this.report.ReportType[0] : '';

        // TODO: Enable it back when functionality is in place
        self.fn.startEditingName = function () {

            return;

            if (self.fireOpenFolder){ return; }
            self.originalName = self.report.Name;
            self.editingName = true;
        };

        self.fn.saveName = function () {
            if (!self.report.Name) {
                self.nameError = "Name cannot be empty";
            } else {
                self.nameError = "";
                self.inProgress = true;
                self.event.onSaveName(self.report);
            }
        };

        self.fn.sendFolderReportOpenCommand = function (item) {
            if (!self.fireOpenFolder || item.Type !== 'folder'){ return; }
            var folderId = item.Id;

            self.reportEventBus.fireFolderReportSelected(folderId);
        };

        self.fn.sendReportOpenCommand = function (item) {
            if (!self.fireOpenFolder || item.Type !== 'report'){ return; }

            var id = item.Id;
            self.reportEventBus.fireReportSelected(id);
        };

        self.fn.cancelEditingName = function () {
            self.nameError = "";
            self.report.Name = self.originalName;
            self.editingName = false;
        };

        // TODO: Enable it back when functionality is in place
        self.fn.startEditingDescription = function () {

            return;

            self.originalDescription = self.report.Description;
            self.editingDescription = true;
        };

        self.fn.saveDescription = function () {
            if (!self.report.Description) {
                self.descriptionError = "Description cannot be empty";
            } else {
                self.descriptionError = "";
                self.inProgress = true;
                self.event.onSaveDescription(self.report);
            }
        };

        self.fn.cancelEditingDescription = function () {
            self.descriptionError = "";
            self.report.Description = self.originalDescription;
            self.editingDescription = false;
        };

        self.fn.changeReportType = function (selectedReportType) {
            self.selectedReportType = selectedReportType;
        };

        self.fn.toggleFavouriteReport = function () {
            self.inProgress = true;
            self.event.toggleFavouriteReport(self.report.Id);
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

    ReportItemView.prototype.onToggledFavouriteReport = function () {
        var self = this;
        self.report.Favorite = !self.report.Favorite;
        self.inProgress = false;
    };

    ReportItemView.prototype.onOtherReportInProgressStateChange = function (reportId, state) {
        var self = this;
        if (reportId === self.report.Id) return;
        self.otherReportInProgress = state;
    };

    ReportItemView.prototype.onSaveNameSuccess = function (data) {
        if( !("Name" in data) ){
            throw new Error("Name property not found");
        }
        this.report.Name = data.Name;
        this.editingName = false;
        this.inProgress = false;
    };

    ReportItemView.prototype.onSaveNameError = function (data) {
        console.error("Save name failed");
        this.inProgress = false;
    };

    ReportItemView.prototype.onSaveDescriptionSuccess = function (data) {
        if( !("Description" in data) ){
            throw new Error("Description property not found");
        }
        this.report.Description = data.Description;
        this.editingDescription = false;
        this.inProgress = false;
    };

    ReportItemView.prototype.onSaveDescriptionError = function (data) {
        console.error("Save description failed");
        this.inProgress = false;
    };

    ReportItemView.prototype.openParamsDialog = function (callback) {
        var self = this;
        var paramDialog = self.modalService.open({
            templateUrl: 'app/modules/saleAnalytics/reports/reportParamsDialog/reportParamDialog.html?v='+ $('body').attr('id'),
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
        self.reportEventBus.fireReportIsInProgress(self.report.Id, true);
        self.event.getParameterConfiguration(self.report.Id, self.onParameterConfigurationLoaded.bind(self), self.onParameterConfigurationError.bind(self));
    };

    ReportItemView.prototype.onParameterConfigurationLoaded = function (data) {

        var self = this;
        self.report.parameterConfigurations = data;
        if (!self.report.parameterConfigurations || self.report.parameterConfigurations.length <= 0) {
            self.currentActionForEmptyOrAssignedParameters();
        }
        else {
            self.currentActionForParameters(data);
        }
        self.inProgress = false;
        self.reportEventBus.fireReportIsInProgress(self.report.Id, false);
    };

    ReportItemView.prototype.configureParameters = function (parameterConfigurations) {
        var self = this;
        self.report.parameterConfigurations = parameterConfigurations;
        self.openParamsDialog(self.onParameterSet.bind(self));
    };

    ReportItemView.prototype.previewReport = function () {
        var self = this;
        self.modalService.open({
            templateUrl: 'app/modules/saleAnalytics/reports/previewDialog/previewDialog.html?v='+ $('body').attr('id'),
            windowTemplateUrl: 'app/modules/saleAnalytics/reports/previewDialog/previewDialogWindow.html?v='+ $('body').attr('id'),
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
        self.report.selectedReportType = self.selectedReportType;
        self.event.getReportURL(self.report, self.onReportURLLoadedForSend.bind(self), self.onGetReportURLError.bind(self));
    };

    ReportItemView.prototype.downloadReport = function () {
        var self = this;
        self.report.selectedReportType = self.selectedReportType;
        self.event.getReportURL(self.report, self.onReportURLLoadedForDownload.bind(self), self.onGetReportURLError.bind(self));
    };

    ReportItemView.prototype.onReportURLLoadedForSend = function (data) {
        var a = document.createElement("A");
        var subject = "Report from Force Manager";
        var body = encodeURIComponent(data);
        a.href = "mailto:?subject=" + subject + "&body=" + body + "&html=true";
        a.click();
    };

    ReportItemView.prototype.onReportURLLoadedForDownload = function (data) {
        var a = document.createElement("A");
        a.href = data;
        a.click();
        //window.alert("Link URL: " + data);
    };

    ReportItemView.prototype.onParameterSet = function (data) {
        var self = this;
        self.report.params = data.params;
        self.currentActionForEmptyOrAssignedParameters();
    };

    ReportItemView.prototype.onGetReportURLError = function (err) {
        this.toastService.error( this.translator.translate("Reports_Get_Download_Url_Error") );
        this.inProgress = false;
        this.reportEventBus.fireReportIsInProgress(this.report.Id, false);
    };

    ReportItemView.prototype.onParameterConfigurationError = function (err) {
        this.toastService.error( this.translator.translate("Reports_Get_ParamConfig_Error") );
        this.inProgress = false;
        this.reportEventBus.fireReportIsInProgress(this.report.Id, false);
    };

    ReportItemView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {

        var view = new ReportItemView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});