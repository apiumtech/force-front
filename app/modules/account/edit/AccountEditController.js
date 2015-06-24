/**
 * Created by Justin on 3/19/2015.
 */
define([
    'app',
    'modules/account/edit/AccountEditView'
], function (app, AccountEditView) {

    function AccountEditController($scope, $routeParams, $upload, $validation, $injector) {
        $scope.accountId = $routeParams.account_id;
        $scope.$injector = $injector;
        $scope.$upload = $upload;
        $scope.$validation = $validation;
        AccountEditController.configureView($scope);
    }

    AccountEditController.configureView = function ($scope) {
        this.view = AccountEditView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountEditController', ['$scope', '$routeParams', '$upload', '$validation', '$injector', AccountEditController]);

    return AccountEditController;
});