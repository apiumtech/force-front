define([
    'app',
    'shared/BaseController',
    'modules/account/addContact/AddContactView'
], function (app, BaseController, AddContactView) {
    'use strict';

    function AddContactController($scope, $routeParams, $upload) {
        $scope.accountId = $routeParams.account_id;
        BaseController.call(this);
        this.configureView($scope, $upload);
    }

    AddContactController.inherits(BaseController, {});

    AddContactController.prototype.configureView = function ($scope, $upload) {
        this.view = AddContactView._diResolve();
        this.triggerView(this.view, $scope);
    };

    app.register.controller('AddContactController', ['$scope', '$routeParams', '$upload', AddContactController]);

    return AddContactController;
});