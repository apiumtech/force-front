/**
 * Created by Justin on 1/5/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
    }

    WidgetDecoratePageView.prototype = Object.create(BaseView.prototype, {
        widgets: {
            get: function () {
                return this.$scope.widgets;
            },
            set: function (value) {
                this.$scope.widgets = value;
            }
        }
    });

    WidgetDecoratePageView.prototype.decorateWidget = function (widgetsData) {
        widgetsData.forEach(function (widget) {
            widget.template = '/templates/widgets/' + widget.type + '.html';
        });
    };

    WidgetDecoratePageView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData.body);
        this.widgets = widgetsData.body;
    };

    WidgetDecoratePageView.prototype.unDecorateWidgetData = function () {
        return this.widgets.map(function (widget) {
            return _.omit(widget, 'template');
        });
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {
        console.log(error);
    };

    return WidgetDecoratePageView;
});