define([
    'app',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateView'
], function(app, CustomLiteralsEditCreateView) {

    function CustomLiteralsEditCreateController($routeParams, $scope, $injector) {
        $scope.$injector = $injector;
        $scope.$validation = $injector.get('$validation');
        CustomLiteralsEditCreateController.configureView($routeParams, $scope);
    }

    CustomLiteralsEditCreateController.configureView = function ($routeParams, $scope) {
        var view = CustomLiteralsEditCreateView.newInstance({scope: $scope, routeParams: $routeParams});
        view.show();
    };

    app.register.controller('CustomLiteralsEditCreateController', ['$routeParams', '$scope', '$injector', CustomLiteralsEditCreateController]);

    return CustomLiteralsEditCreateController;
});
