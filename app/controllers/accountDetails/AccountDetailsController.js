/**
 * Created by justin on 3/9/15.
 */
app.registerController(function (container) {
    var AccountDetailsView = container.getView("views/accountDetails/AccountDetailsView");

    function AccountDetailsController($scope, $routeParams) {
        var account_id = $routeParams.account_id;
        $scope.accountId = account_id;
        this.view = AccountDetailsController.configureView($scope, account_id);
    }

    AccountDetailsController.configureView = function (scope, accountId) {
        return AccountDetailsView.newInstance(scope, accountId);
    };

    return AccountDetailsController;
});