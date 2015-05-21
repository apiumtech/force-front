/**
 * Created by Justin on 3/19/2015.
 */
define([
    'app',
    'shared/components/confirmationDialog/ConfirmationDialogView'
], function (app, ConfirmationDialogView) {

    function NotificationDialogController($scope, $modalInstance, title, message) {
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        NotificationDialogController.configureView($scope, $modalInstance);
    }

    NotificationDialogController.configureView = function ($scope, $modalInstance) {
        this.view = ConfirmationDialogView.newInstance($scope, $modalInstance);
        this.view.show();
    };

    app.register.controller('NotificationDialogController', NotificationDialogController);

    return NotificationDialogController;
});