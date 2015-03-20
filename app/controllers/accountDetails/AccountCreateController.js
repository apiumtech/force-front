/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var AccountCreateView = container.getView("views/accountDetails/AccountCreateView");

    function AccountCreateController($scope, $modalInstance, $modal, $upload) {
        $scope.$modal = $modal;
        $scope.$upload = $upload;
        AccountCreateController.configureView($scope, $modalInstance);
    }

    AccountCreateController.configureView = function ($scope, $modalInstance) {
        this.view = AccountCreateView.newInstance($scope, $modalInstance).getOrElse(throwInstantiateException(AccountCreateView));
        this.view.show();
    };

    return AccountCreateController;
});