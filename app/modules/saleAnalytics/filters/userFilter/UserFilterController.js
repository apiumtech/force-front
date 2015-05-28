define([
	'app',
	'modules/saleAnalytics/filters/userFilter/UserFilterView'
], function(app, UserFilterView) {
	'use strict';

	function UserFilterController($scope) {
		UserFilterController.configureView($scope);
	}

	UserFilterController.configureView = function($scope){
		this.view = new UserFilterView.newInstance($scope);
		this.view.show();
	};

	app.register.controller('UserFilterController', ['$scope', UserFilterController]);

	return UserFilterController;
});