define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter'
], function (BaseView, ReportItemPresenter) {
    'use strict';

    function ReportItemView($scope, $element, $presenter) {
        BaseView.call(this, $scope, null, $presenter);
        this.element = $element;
        this.originalName = "";
        this.originalDescription = "";
        this.configureEvents();
    }

    ReportItemView.prototype = Object.create(BaseView.prototype, {
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
        }
    });

    ReportItemView.prototype.configureEvents = function () {
        var self = this;

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

    ReportItemView.newInstance = function ($scope, $element, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $presenter = $presenter || new ReportItemPresenter();

        var view = new ReportItemView($scope, $element, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});