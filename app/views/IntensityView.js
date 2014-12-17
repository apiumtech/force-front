/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function IntensityView($scope, $model, $presenter) {
        this.data = {};
        this.event = {};
        this.fn = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.model = $model;
        this.presenter = $presenter;
    }

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
