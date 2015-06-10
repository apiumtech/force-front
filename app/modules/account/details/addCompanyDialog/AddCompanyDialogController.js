define([
	'app',
	'modules/account/details/addCompanyDialog/AddCompanyDialogView',
	'modules/saleAnalytics/reports/reportParamsDialog/AutocompleteDirective'
], function (app, AddCompanyDialogView) {
	'use strict';

	function AddCompanyDialogController($scope, $modalInstance, accountName) {
		$scope.accountName = accountName;
		console.log("ACCOUNT NAME", $scope.accountName );
		AddCompanyDialogController.configureView($scope, $modalInstance);
	}

	AddCompanyDialogController.configureView = function ($scope, $modalInstance) {
		this.view = AddCompanyDialogView.newInstance($scope, $modalInstance);
		this.view.show();
	};

	app.register.controller('AddCompanyDialogController', ['$scope', '$modalInstance', 'accountName', AddCompanyDialogController]);

	return AddCompanyDialogController;
});