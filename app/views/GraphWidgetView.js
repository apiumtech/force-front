/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');
    var GraphWidgetModel = container.getModel('models/GraphWidgetModel');
    var GraphWidgetPresenter = container.getPresenter('presenters/GraphWidgetPresenter');

    function GraphWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope._widget = null;
        var self = this;
        setTimeout(function () {
            console.log($(self.element).parent().attr("data-widgetid"));
        }, 0);
    }

    GraphWidgetView.prototype = Object.create(WidgetBaseView.prototype);

    GraphWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || GraphWidgetModel.newInstance().getOrElse(throwException("Cannot instantiate GraphWidgetModel"));
        var presenter = $presenter || GraphWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate GraphWidgetPresenter"));

        var view = new GraphWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return GraphWidgetView;
});