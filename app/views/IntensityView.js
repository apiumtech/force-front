/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {

    var BaseView = container.getView('views/BaseView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        BaseView.call(this,$scope, $model, $presenter);
    }

    IntensityView.prototype = Object.create(BaseView.prototype);

    //TODO: pull newInstance to BaseView (use decorator to call super())

    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || IntensityModel.newInstance().getOrElse(throwException("IntensityModel could not be instantiated!!"));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwException("IntensityPresenter could not be instantiated!!"));

        var view = new IntensityView(scope, model, presenter);

        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(view);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(view);
        }

        return Some(view);
    };

    return {newInstance: IntensityView.newInstance};
});
