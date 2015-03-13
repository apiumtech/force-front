/**
 * Created by justin on 3/13/15.
 */
app.registerController(function (container) {
    var AccountDetailWidgetWrapperView = container.getView('views/accountDetails/AccountDetailWidgetWrapperView');

    function WidgetWrapperController($scope, $element) {
        WidgetWrapperController.configureView($scope, $element);
    }

    WidgetWrapperController.configureView = function ($scope, $element) {
        this.view = AccountDetailWidgetWrapperView.newInstance($scope, $element).getOrElse(throwInstantiateException(AccountDetailWidgetWrapperView));
        this.view.show();
    };

    return WidgetWrapperController;
});