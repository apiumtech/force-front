define([
	'app',
	'modules/saleAnalytics/reports/reportFilter/ReportFilterView'
], function(app, ReportFilterView) {
	'use strict';

	function ReportFilterController($scope) {
		ReportFilterController.configureView($scope);
	}

	ReportFilterController.configureView = function ($scope) {
		this.view = ReportFilterView.newInstance($scope);
		this.view.show();
	};

	app.register.controller('ReportFilterController', ['$scope', ReportFilterController]);

	return ReportFilterController;
});