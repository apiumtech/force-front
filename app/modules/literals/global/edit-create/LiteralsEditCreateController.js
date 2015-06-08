define([
    'app',
    'modules/literals/global/edit-create/LiteralsEditCreateView'
], function(app, LiteralsEditCreateView) {

    function LiteralsEditCreateController($routeParams, $scope) {
        LiteralsEditCreateController.configureView($routeParams, $scope);
    }

    LiteralsEditCreateController.configureView = function ($routeParams, $scope) {
        var view = LiteralsEditCreateView.newInstance({scope: $scope, routeParams: $routeParams});
        view.show();
    };

    app.register.controller('LiteralsEditCreateController', ['$routeParams', '$scope', LiteralsEditCreateController]);

    return LiteralsEditCreateController;
});
