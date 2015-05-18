/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var LiteralListView = container.getView("views/literal/LiteralListView");

    function LiteralListController($scope, $compile) {
        LiteralListController.configureView($scope, $compile);
    }

    LiteralListController.configureView = function ($scope, $compile) {
        this.view = LiteralListView.newInstance($scope, null, null, null, null, $compile);
        this.view.show();
    };

    return LiteralListController;
});
