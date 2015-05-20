/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/details/AccountDetailsView'
], function (app, AccountDetailsView) {

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
        this.view = AccountDetailsView.newInstance(scope, $modal);
        this.view.show();
    };

    app.register.controller('AccountDetailsController', ['$scope', '$modal', '$routeParams', AccountDetailsController]);

    return AccountDetailsController;
});