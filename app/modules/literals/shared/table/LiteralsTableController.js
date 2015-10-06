define([
	'app',
	'modules/literals/shared/table/LiteralsTableView'
], function(app, LiteralsTableView) {
	'use strict';

	function LiteralsTableController($scope, $compile, $sce) {
        LiteralsTableController.configureView($scope, $compile, $sce);
	}

    LiteralsTableController.configureView = function ($scope, $compile, $sce) {
		var view = LiteralsTableView.newInstance({scope: $scope, compile: $compile, sce: $sce});
		view.show();
	};

	app.register.controller('LiteralsTableController', ['$scope', '$compile', '$sce', LiteralsTableController]);

	return LiteralsTableController;
});