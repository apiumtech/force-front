/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/details/AccountDetailsView',

    'modules/account/widgets/activity/AccountDetailActivityDirective',
    'modules/account/widgets/opportunity/AccountDetailOpportunityDirective',
    'modules/account/widgets/agenda/AccountDetailAgendaDirective',
    'modules/account/widgets/documents/AccountDetailDocumentsDirective',
    'modules/account/widgets/analytic/AccountAnalyticWidgetDirective',

    'modules/account/details/addCompanyDialog/AddCompanyDialogController'

], function (app, AccountDetailsView) {
    'use strict';

    function AccountDetailsController($scope, $modal, $routeParams) {
        var account_id = $routeParams.account_id;
        $scope.$modal = $modal;
        $scope.accountId = account_id;
        AccountDetailsController.configureView($scope);
    }

    AccountDetailsController.configureView = function (scope) {
        this.view = AccountDetailsView.newInstance(scope, {});
        this.view.show();
    };

    app.register.controller('AccountDetailsController', ['$scope', '$modal', '$routeParams', AccountDetailsController]);

    return AccountDetailsController;
});