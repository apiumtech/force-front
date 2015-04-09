/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var AccountEditView = container.getView("views/accountDetails/AccountEditView");

    function AccountEditController($scope, $routeParams, $injector) {
        $scope.accountId = $routeParams.account_id;
        $scope.$injector = $injector;
        $scope.$upload = $injector.get('$upload');
        $scope.$validation = $injector.get('$validation');
        AccountEditController.configureView($scope);
    }

    AccountEditController.configureView = function ($scope) {
        this.view = AccountEditView.newInstance($scope).getOrElse(throwInstantiateException(AccountEditView));
        this.view.show();
    };

    return AccountEditController;
});