define([
	'app',
	'modules/literals/shared/table/LiteralsTableView'
], function(app, LiteralsTableView) {
	'use strict';

	function LiteralsTableController($scope, $compile) {
        LiteralsTableController.configureView($scope, $compile);
	}

    LiteralsTableController.configureView = function ($scope, $compile) {
		var view = LiteralsTableView.newInstance({scope: $scope, compile: $compile});
		view.show();
	};

	app.register.controller('LiteralsTableController', ['$scope', '$compile', LiteralsTableController]);

	return LiteralsTableController;
});