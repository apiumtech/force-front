define([
	'app',
	'core/sideMenu/SideMenuView'
], function (app, SideMenuView) {
	
	function SideMenuController($scope, $window) {
		SideMenuController.configureView($scope, $window);
	};
	
	SideMenuController.configureView = function ($scope, $window) {
		this.view = SideMenuView.newInstance($scope, $window);
		this.view.show();
	};
	
	app.register.controller('SideMenuController', ['$scope', '$window', SideMenuController]);
	
	return SideMenuController;
});