/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
define([
    'app',
    'modules/literal/LiteralListView'
], function (app, LiteralListView) {

    function LiteralListController($scope, $compile) {
        LiteralListController.configureView($scope, $compile);
    }

    LiteralListController.configureView = function ($scope, $compile) {
        this.view = LiteralListView.newInstance({scope:$scope, compile:$compile});
        this.view.show();
    };

    app.register.controller('LiteralListController', ['$scope', '$compile', LiteralListController]);

    return LiteralListController;
});
