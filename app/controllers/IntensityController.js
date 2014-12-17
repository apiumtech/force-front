/**
 * Created by justin on 12/17/14.
 */
app.registerController(function (container) {
    var IntensityView = container.getView("views/IntensityView");

    function IntensityController($scope) {
        IntensityController.configureView($scope);
    }

    IntensityController.configureView = function ($scope) {
        this.view = IntensityView.newInstance($scope).getOrElse(throwException("Could not create IntensityView!"));
    };

    return IntensityController;
});
