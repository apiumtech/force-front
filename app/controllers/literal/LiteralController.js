
app.registerController(function (container) {
    var LiteralView = container.getView("views/literal/LiteralView");

    function LiteralController($routeParams, $scope) {
        LiteralController.configureView($routeParams, $scope);
    }

    LiteralController.configureView = function ($routeParams, $scope) {
        this.view = LiteralView.newInstance($scope, null, null, $routeParams);
        this.view.show();
    };

    return LiteralController;
});
