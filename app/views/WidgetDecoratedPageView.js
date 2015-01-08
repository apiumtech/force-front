/**
 * Created by Justin on 1/5/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        $scope.widgets = null;
    }

    WidgetDecoratePageView.prototype = Object.create(BaseView.prototype, {});

    WidgetDecoratePageView.prototype.decorateWidget = function (widgetsData) {
        widgetsData.forEach(function (widget) {
            widget.template = '/templates/widgets/' + widget.widgetType + '.html';
        });
    };

    WidgetDecoratePageView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData);
        widgetsData.sort(function (widgetA, widgetB) {
            return widgetA.order - widgetB.order;
        });
        this._rearrangeWidgetsList(widgetsData);
        this.$scope.widgets = widgetsData;
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {
        console.log(error);
    };

    /**
     * Re-Arrange widgets
     * @param widgetsData
     * @abstract
     */
    WidgetDecoratePageView.prototype._rearrangeWidgetsList = function (widgetsData) {
    };

    return WidgetDecoratePageView;
});