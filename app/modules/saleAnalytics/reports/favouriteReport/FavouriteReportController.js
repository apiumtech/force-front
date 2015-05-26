define([
	'app',
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportView'
], function (app, FavouriteReportView) {
	'use strict';

	function FavouriteReportController($scope) {
		FavouriteReportController.configureView($scope);
	}

	FavouriteReportController.configureView = function ($scope) {
		this.view = FavouriteReportView.newInstance($scope);
		this.view.show();
	}

	app.register.controller('FavouriteReportController', ['$scope', FavouriteReportController]);

	return FavouriteReportController;
});