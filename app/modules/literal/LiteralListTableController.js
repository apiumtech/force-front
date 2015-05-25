define([
    'app',
    'modules/literal/LiteralListTableView'
], function (app, LiteralListTableView) {

    function LiteralListTableController($scope, $compile) {
        LiteralListTableController.configureView($scope, $compile);
    }

    LiteralListTableController.configureView = function ($scope, $compile) {
        this.view = LiteralListTableView.newInstance({scope:$scope, compile:$compile});
        this.view.show();
    };

    app.register.controller('LiteralListTableController', ['$scope', '$compile', LiteralListTableController]);

    return LiteralListTableController;
});
