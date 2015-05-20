/**
 * Created by joanllenas on 4/21/15
 */

define([
    'app',
    'core/topMenu/TopMenuView'
], function (app, TopMenuView) {

    function TopMenuController($scope, $window) {
        TopMenuController.configureView($scope, $window);
    }

    TopMenuController.configureView = function ($scope, $window) {
        this.view = TopMenuView.newInstance($scope, $window);
        this.view.show();
    };

    app.register.controller('TopMenuController', ['$scope', '$window', TopMenuController]);

    return TopMenuController;
});
