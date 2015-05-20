/**
 * Created by joanllenas on 4/21/15
 */

define([
        ''
],function () {
    var TopMenuView = container.getView("views/TopMenuView");

    function TopMenuController($scope, $window) {
        TopMenuController.configureView($scope, $window);
    }

    TopMenuController.configureView = function ($scope, $window) {
        this.view = TopMenuView.newInstance($scope, $window);
        this.view.show();
    };

    return TopMenuController;
});
