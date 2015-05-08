/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var LiteralView = container.getView("views/literal/LiteralView");

    function LiteralController($routeParams, $scope) {
        LiteralController.configureView($routeParams, $scope);
    }

    LiteralController.configureView = function ($routeParams, $scope) {
        this.view = LiteralView.newInstance($routeParams, $scope).getOrElse(throwException("Could not create LiteralView!"));
        this.view.show();
    };

    return LiteralController;
});
