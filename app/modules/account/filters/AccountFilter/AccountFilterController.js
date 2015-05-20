/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'app',
    'modules/filters/account/AccountFilterView'
], function (AccountFilterView) {

    function AccountFilterController($scope) {
        AccountFilterController.configureView($scope);
    }

    AccountFilterController.configureView = function ($scope) {
        this.view = AccountFilterView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountFilterController', ['$scope', AccountFilterController]);
});
