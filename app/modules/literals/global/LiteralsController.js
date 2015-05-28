define([
	'app',
	'modules/literals/global/LiteralsView',
], function(app, LiteralsView) {
	'use strict';

	function LiteralsController($scope) {
		LiteralsController.configureView($scope);
	}

	LiteralsController.configureView = function ($scope) {
		var view = LiteralsView.newInstance($scope);
		view.show();
	};

	app.register.controller('LiteralsController', ['$scope', LiteralsController]);

	return LiteralsController;
});