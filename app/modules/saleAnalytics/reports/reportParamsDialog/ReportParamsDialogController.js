define([
	'app',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogView',
	'shared/components/AutocompleteDirective',
	'modules/saleAnalytics/reports/reportParamsDialog/ValueRangeDirective'
], function (app, ReportParamsDialogView) {
	'use strict';

	function ReportParamsDialogController($scope, $modalInstance, report) {
		$scope.report = report;
		ReportParamsDialogController.configureView($scope, $modalInstance);
	}

	ReportParamsDialogController.configureView = function ($scope, $modalInstance) {
		this.view = ReportParamsDialogView.newInstance($scope, $modalInstance);
		this.view.show();
	};

	app.register.controller('ReportParamsDialogController', ['$scope', '$modalInstance', 'report', ReportParamsDialogController]);

	return ReportParamsDialogController;
});