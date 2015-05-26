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
            self.event.onSaveName(self.report.id, self.report.name);
        };

        self.fn.cancelEditingName = function () {
            self.report.name = self.originalName;
            self.editingName = false;
        };

        self.fn.startEditingDescription = function () {
            self.originalDescription = self.report.description;
            self.editingDescription = true;
        };

        self.fn.saveDescription = function () {
            self.event.onSaveDescription(self.report.id, self.report.description);
        };

        self.fn.cancelEditingDescription = function () {
            self.report.description = self.originalDescription;
            self.editingDescription = false;
        };
    };

    ReportItemView.newInstance = function ($scope, $element, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $presenter = $presenter || new ReportItemPresenter();

        var view = new ReportItemView($scope, $element, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ReportItemView;
});