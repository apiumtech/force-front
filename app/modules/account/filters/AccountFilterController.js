/**
 * Created by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var AccountFilterView = container.getView("views/account/AccountFilterView");

    function AccountFilterController($scope) {
        AccountFilterController.configureView($scope);
    }

    AccountFilterController.configureView = function ($scope) {
        this.view = AccountFilterView.newInstance($scope);
        this.view.show();
    };

    return AccountFilterController;
});
