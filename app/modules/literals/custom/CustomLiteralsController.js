define([
    'app',
    'modules/literals/custom/CustomLiteralsView',
], function(app, CustomLiteralsView) {
	'use strict';

	function CustomLiteralsController($scope) {
        CustomLiteralsController.configureView($scope);
    }

    CustomLiteralsController.configureView = function ($scope) {
        var view = CustomLiteralsView.newInstance($scope);
        view.show();
    };

    app.register.controller('CustomLiteralsController', ['$scope', CustomLiteralsController]);

	return CustomLiteralsController;
});