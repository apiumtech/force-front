define([
	'app',
	'modules/literals/shared/table/LiteralsTableView'
], function(app, LiteralsTableView) {
	'use strict';

	function LiteralsTableController($scope, $sce) {
        LiteralsTableController.configureView($scope, $sce);
	}

    LiteralsTableController.configureView = function ($scope, $sce) {
		var view = LiteralsTableView.newInstance({scope: $scope, sce: $sce});
		view.show();
	};

	app.register.controller('LiteralsTableController', ['$scope', '$sce', LiteralsTableController]);

	return LiteralsTableController;
});