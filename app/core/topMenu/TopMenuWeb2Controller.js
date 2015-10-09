/**
 * Created by joanllenas on 4/21/15
 */

define([
    'app',
    'core/topMenu/TopMenuWeb2View'
], function (app, TopMenuWeb2View) {

    function TopMenuWeb2Controller($scope, $window) {
        TopMenuWeb2Controller.configureView($scope, $window);
    }

    TopMenuWeb2Controller.configureView = function ($scope, $window) {
        this.view = TopMenuWeb2View.newInstance($scope, null, null, $window);
        this.view.show();
    };

    app.register.controller('TopMenuWeb2Controller', ['$scope', '$window', TopMenuWeb2Controller]);

    return TopMenuWeb2Controller;
});
