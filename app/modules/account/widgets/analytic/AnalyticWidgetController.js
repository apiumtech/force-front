define([
	'app',
	'modules/account/widgets/analytic/AnalyticWidgetView'
], function(app, AnalyticWidgetView) {
	'use strict';

	function AnalyticWidgetController($scope, $element) {
		AnalyticWidgetController.configureView($scope, $element);
	}

	AnalyticWidgetController.configureView = function($scope, $element){
		this.view = AnalyticWidgetView.newInstance($scope, $element);
		this.view.show();
	};

	app.register.controller('AnalyticWidgetController', ['$scope', '$element', AnalyticWidgetController]);

	return AnalyticWidgetController;
});