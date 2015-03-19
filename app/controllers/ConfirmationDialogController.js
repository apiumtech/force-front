/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var ConfirmationDialogView = container.getView("views/ConfirmationDialogView");

    function ConfirmationDialogController($scope, $modalInstance, title, message, okButtonTitle, cancelButtonTitle) {
        $scope.modalTitle = title;
        $scope.modalMessage = message;
        $scope.okButtonTitle = okButtonTitle;
        $scope.cancelButtonTitle = cancelButtonTitle;
        ConfirmationDialogController.configureView($scope, $modalInstance);
    }

    ConfirmationDialogController.configureView = function ($scope, $modalInstance) {
        this.view = ConfirmationDialogView.newInstance($scope, $modalInstance).getOrElse(throwInstantiateException(ConfirmationDialogView));
        this.view.show();
    };

    return ConfirmationDialogController;
});