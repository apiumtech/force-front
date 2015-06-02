/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/intensity/IntensityPresenter'
], function (WidgetDecoratedPageView, IntensityPresenter) {

    function IntensityView($scope, $presenter) {
        $presenter = $presenter || new IntensityPresenter();
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'intensity';
    }

    IntensityView.inherits(WidgetDecoratedPageView, {});

    IntensityView.prototype.show = function () {
        this.__base__.show.call(this);
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

    IntensityView.newInstance = function ($scope, $viewRepAspect, $logErrorAspect) {
        var view = new IntensityView($scope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityView;
});
