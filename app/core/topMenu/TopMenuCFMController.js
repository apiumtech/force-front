/**
 * Created by joanllenas on 4/21/15
 */

define([
    'app',
    'core/topMenu/TopMenuCFMView'
], function (app, TopMenuCFMView) {

    function TopMenuCFMController($scope, $window) {
        TopMenuCFMController.configureView($scope, $window);
    }

    TopMenuCFMController.configureView = function ($scope, $window) {
        this.view = TopMenuCFMView.newInstance($scope, null, null, $window);
        this.view.show();
    };

    app.register.controller('TopMenuCFMController', ['$scope', '$window', TopMenuCFMController]);

    return TopMenuCFMController;
});
