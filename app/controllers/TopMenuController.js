/**
 * Created by joanllenas on 4/21/15
 */

app.registerController(function (container) {
    var TopMenuView = container.getView("views/TopMenuView");

    function TopMenuController($scope, $window) {
        TopMenuController.configureView($scope, $window);
    }

    TopMenuController.configureView = function ($scope, $window) {
        this.view = TopMenuView.newInstance($scope, $window).getOrElse(throwException("Could not create TopMenuView!"));
        this.view.show();
    };

    return TopMenuController;
});
