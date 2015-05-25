/**
 * Created by Justin on 1/5/2015.
 */

define([
    'shared/BaseView',
    'modules/widgets/WidgetWrapperDirective',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController',
], function (BaseView) {

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.dropZoneClassName = "dropzone";
        this.widgetContainerSelector = '.widgets-container[as-sortable]';
        this.fixedAreaSelector = '.fixedarea[as-sortable]';
        this.configureEvents();
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

    WidgetDecoratePageView.prototype.configureEvents = function () {
    };

    WidgetDecoratePageView.prototype.decorateWidget = function (widgetsData) {
        var self = this;
        widgetsData.forEach(function (widget) {
            widget.template = 'app/modules/saleAnalytics/' + self.pageName + '/' + widget.type + '.html';
        });
    };

    WidgetDecoratePageView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData.body);
        this.widgets = widgetsData.body;
    };

    WidgetDecoratePageView.prototype.getElementIndex = function (element) {
        return $(element).index();
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {
        console.log(error);
    };

    return WidgetDecoratePageView;
});