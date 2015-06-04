define([
	'app',
	'modules/literals/global/LiteralsView',
	'modules/literals/shared/table/LiteralsTableController',
	'modules/literals/shared/search/LiteralsSearchController'
], function(app, LiteralsView) {
	'use strict';

	function LiteralsController($scope) {
		LiteralsController.configureView($scope);
	}

	LiteralsController.configureView = function ($scope) {
		var view = LiteralsView.newInstance({scope: $scope});
		view.show();
	};

	app.register.controller('LiteralsController', ['$scope', LiteralsController]);

	return LiteralsController;
});