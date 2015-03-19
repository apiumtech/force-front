/**
 * Created by justin on 3/9/15.
 */
app.registerController(function (container) {
    var AccountDetailsView = container.getView("views/accountDetails/AccountDetailsView");

    /**
     * Create instance of AccountDetailsController
     * @param $scope The Angular Scope
     * @param $modal The Angular Bootstrap Modal service
     * @param $routeParams The routeParams on Angular Route
     * @constructor
     */
    function AccountDetailsController($scope, $modal, $routeParams) {
        var account_id = $routeParams.account_id;
        $scope.accountId = account_id;
        AccountDetailsController.configureView($scope, $modal);
    }

    AccountDetailsController.configureView = function (scope, $modal) {
        this.view = AccountDetailsView.newInstance(scope, $modal).getOrElse(throwInstantiateException(AccountDetailsView));
        this.view.show();
    };

    return AccountDetailsController;
});