/**
 * Created by xavi on 12/16/14.
 */
app.registerController(function (container) {
    var LeftMenuView = container.getView("views/LeftMenuView");
    var AppsAdapter = container.getService("AppsAdapter");

    function LeftMenuController($scope) {
        LeftMenuController.configureView($scope);
        AppsAdapter.initSideBar();
    }

    LeftMenuController.configureView = function ($scope) {
        this.view = LeftMenuView.newInstance($scope).getOrElse(throwException("Could not create LeftMenuView!"));
        this.view.show();
    };

    return LeftMenuController;
});
