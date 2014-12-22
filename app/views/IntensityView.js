/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {

    var BaseView = container.getView('views/BaseView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);

        this.$scope.widgets = [
            {title: 'Widget A', template: '/templates/analytics/chart1.html'},
            {title: 'Widget B', template: '/templates/analytics/chart2.html'}
        ];
    }

    IntensityView.prototype = Object.create(BaseView.prototype);

    //TODO: pull newInstance to BaseView (use decorator to call super())

    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance().getOrElse(throwException("IntensityModel could not be instantiated!!"));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwException("IntensityPresenter could not be instantiated!!"));

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: IntensityView.newInstance};
});
