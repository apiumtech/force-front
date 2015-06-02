define([
    'shared/BaseView'
], function (BaseView) {
    'use strict';

    function PreviewDialogView($scope, $modalInstance) {
        BaseView.call(this, $scope);
        this.$modalInstance = $modalInstance;
    }

    PreviewDialogView.inherits(BaseView, {});

    PreviewDialogView.prototype.show = function () {
        this.__base__.show.call(this);
        this.configureEvents();
    };

    PreviewDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closePreview = function () {
            self.$modalInstance.dismiss();
        };
    };

    PreviewDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new PreviewDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return PreviewDialogView;
});