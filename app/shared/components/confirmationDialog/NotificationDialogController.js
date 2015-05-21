/**
 * Created by Justin on 3/19/2015.
 */
define([
    'shared/components/confirmationDialog/ConfirmationDialogView'
], function(ConfirmationDialogView){

    function NotificationDialogController($scope, $modalInstance, title, message) {
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        NotificationDialogController.configureView($scope, $modalInstance);
    }

    NotificationDialogController.configureView = function ($scope, $modalInstance) {
        this.view = ConfirmationDialogView.newInstance($scope, $modalInstance);
        this.view.show();
    };

    return NotificationDialogController;
});