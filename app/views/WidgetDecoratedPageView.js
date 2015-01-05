/**
 * Created by Justin on 1/5/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        $scope.widgets = [];
    }

    WidgetDecoratePageView.prototype = Object.create(BaseView.prototype, {});

    WidgetDecoratePageView.prototype.decorateWidget = function (widgetsData) {
        widgetsData.forEach(function (widget) {
            widget.template = '/templates/widgets/' + widget.widgetType + '.html';
        });
    };

    WidgetDecoratePageView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData);
        this._rearrangeWidgetsList(widgetsData);
        this.$scope.widgets = widgetsData;
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {
        alert("error while loading widgets");
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