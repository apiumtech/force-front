/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'app',
    'modules/account/filters/accountFilter/AccountFilterView',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterController',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterController',
    'modules/account/filters/stringTypeFilter/StringTypeFilterController',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterDirective',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterDirective',
    'modules/account/filters/stringTypeFilter/StringTypeFilterDirective'
], function (app, AccountFilterView) {

    function AccountFilterController($scope) {
        AccountFilterController.configureView($scope);
    }

    AccountFilterController.configureView = function ($scope) {
        this.view = AccountFilterView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountFilterController', ['$scope', AccountFilterController]);

    return AccountFilterController;
});
