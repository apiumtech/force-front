/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var ConfirmationDialogView = container.getView("views/ConfirmationDialogView");

    function NotificationDialogController($scope, $modalInstance, title, message) {
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        NotificationDialogController.configureView($scope, $modalInstance);
    }

    NotificationDialogController.configureView = function ($scope, $modalInstance) {
        this.view = ConfirmationDialogView.newInstance($scope, $modalInstance).getOrElse(throwInstantiateException(ConfirmationDialogView));
        this.view.show();
    };

    return NotificationDialogController;
});