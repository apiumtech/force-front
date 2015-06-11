define([
    'app',
    'modules/literals/custom/CustomLiteralsView',
    'modules/literals/shared/table/LiteralsTableController',
    'modules/literals/shared/search/LiteralsSearchController'
], function(app, CustomLiteralsView) {
	'use strict';

	function CustomLiteralsController($scope) {
        CustomLiteralsController.configureView($scope);
    }

    CustomLiteralsController.configureView = function ($scope) {
        var view = CustomLiteralsView.newInstance({scope: $scope});
        view.show();
    };

    app.register.controller('CustomLiteralsController', ['$scope', CustomLiteralsController]);

	return CustomLiteralsController;
});