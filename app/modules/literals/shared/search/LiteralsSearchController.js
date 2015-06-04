define([
	'app',
	'modules/literals/shared/search/LiteralsSearchView'
], function(app, LiteralsSearchView) {
	'use strict';

	function LiteralsSearchController($scope) {
		LiteralsSearchController.configureView($scope);
	}

	LiteralsSearchController.configureView = function ($scope) {
		var view = LiteralsSearchView.newInstance({scope: $scope});
		view.show();
	};

	app.register.controller('LiteralsSearchController', ['$scope', LiteralsSearchController]);

	return LiteralsSearchController;
});