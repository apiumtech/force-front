/**
 * Created by justin on 12/17/14.
 */
app.registerController(function (container) {
    var IntensityView = container.getView("views/IntensityView");

    function IntensityController($scope) {
        IntensityController.configureView($scope);
    }

    IntensityController.configureView = function ($scope) {
        var errorMsg = i18n.t("Errors.IntensityViewCannotInstantiate");
        this.view = IntensityView.newInstance($scope).getOrElse(throwException(errorMsg));
        this.view.show();
    };

    return IntensityController;
});
