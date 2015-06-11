define([
    'app',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateView'
], function(app, CustomLiteralsEditCreateView) {

    function CustomLiteralsEditCreateController($routeParams, $scope) {
        CustomLiteralsEditCreateController.configureView($routeParams, $scope);
    }

    CustomLiteralsEditCreateController.configureView = function ($routeParams, $scope) {
        var view = CustomLiteralsEditCreateView.newInstance({scope: $scope, routeParams: $routeParams});
        view.show();
    };

    app.register.controller('CustomLiteralsEditCreateController', ['$routeParams', '$scope', CustomLiteralsEditCreateController]);

    return CustomLiteralsEditCreateController;
});
