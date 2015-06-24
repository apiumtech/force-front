define([
    'shared/BaseView',
    'config'
], function (BaseView) {
    'use strict';

    function AddCompanyDialogView($scope, $modalInstance) {
        var event = $scope.event;
        BaseView.call(this, $scope);
        $scope.event = event;
        this.$modalInstance = $modalInstance;
        this.configureEvents();
    }

    AddCompanyDialogView.inherits(BaseView, {
        event: {
            get: function () {
                return this.$scope.event;
            },
            set: function (value) {
                this.$scope.event = value;
            }
        }
    });

    AddCompanyDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.close = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.submit = function () {
            self.$modalInstance.close(self.event);
        };

    };

    AddCompanyDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new AddCompanyDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AddCompanyDialogView;
});