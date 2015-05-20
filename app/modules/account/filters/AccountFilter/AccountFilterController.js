/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'app',
    'modules/account/filters/AccountFilter/AccountFilterView',
    'modules/account/filters/BooleanTypeFilter/BooleanTypeFilterController',
    'modules/account/filters/DatetimeFilter/DatetimeTypeFilterController',
    'modules/account/filters/StringTypeFilter/StringTypeFilterController',
    'modules/account/filters/BooleanTypeFilter/BooleanTypeFilterDirective',
    'modules/account/filters/DatetimeFilter/DatetimeTypeFilterDirective',
    'modules/account/filters/StringTypeFilter/StringTypeFilterDirective'
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
