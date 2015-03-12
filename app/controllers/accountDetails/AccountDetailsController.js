/**
 * Created by justin on 3/9/15.
 */
app.registerController(function (container) {
    var AccountDetailsView = container.getView("views/accountDetails/AccountDetailsView");

    function AccountDetailsController($scope, $routeParams) {
        var account_id = $routeParams.account_id;
        $scope.accountId = account_id;
        AccountDetailsController.configureView($scope);
    }

    AccountDetailsController.configureView = function (scope) {
        this.view = AccountDetailsView.newInstance(scope).getOrElse(throwInstantiateException(AccountDetailsView));
        this.view.show();
    };

    return AccountDetailsController;
});