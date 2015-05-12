/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var LiteralListView = container.getView("views/literal/LiteralListView");

    function LiteralListController($scope) {
        LiteralListController.configureView($scope);
    }

    LiteralListController.configureView = function ($scope) {
        this.view = LiteralListView.newInstance($scope);
        this.view.show();
    };

    return LiteralListController;
});
