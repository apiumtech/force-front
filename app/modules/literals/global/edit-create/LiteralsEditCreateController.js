define([
    'app',
    'modules/literals/global/edit-create/LiteralsEditCreateView'
], function(app, LiteralsEditCreateView) {

    function LiteralsEditCreateController($routeParams, $scope, $injector) {
        $scope.$injector = $injector;
        $scope.$validation = $injector.get('$validation');
        LiteralsEditCreateController.configureView($routeParams, $scope);
    }

    LiteralsEditCreateController.configureView = function ($routeParams, $scope) {
        var view = LiteralsEditCreateView.newInstance({scope: $scope, routeParams: $routeParams});
        view.show();
    };

    app.register.controller('LiteralsEditCreateController', ['$routeParams', '$scope', '$injector', LiteralsEditCreateController]);

    return LiteralsEditCreateController;
});
