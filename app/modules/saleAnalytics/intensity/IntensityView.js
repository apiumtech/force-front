/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        this.pageName = 'intensity';
    }

    IntensityView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    IntensityView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    IntensityView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    IntensityView.prototype.updateWidgetIndex = function (movingElement, widget) {
        var self = this;

        self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
    };

    IntensityView.prototype.configureEvents = function (data) {

    };

    IntensityView.prototype.onWidgetsUpdated = function (data) {

    };

    IntensityView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance();
        var presenter = $presenter || IntensityPresenter.newInstance();

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityView;
});