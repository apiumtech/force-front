/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var AccountEditView = container.getView("views/accountDetails/AccountEditView");

    function AccountEditController($scope, $modalInstance, $modal, accountId) {
        $scope.accountId = accountId;
        $scope.$modal = $modal;
        AccountEditController.configureView($scope, $modalInstance);
    }

    AccountEditController.configureView = function ($scope, $modalInstance) {
        this.view = AccountEditView.newInstance($scope, $modalInstance).getOrElse(throwInstantiateException(AccountEditView));
        this.view.show();
    };

    return AccountEditController;
});