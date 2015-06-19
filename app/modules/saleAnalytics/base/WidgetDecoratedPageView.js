/**
 * Created by Justin on 1/5/2015.
 */

define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SaleAnalyticEventBus',

    'modules/widgets/WidgetWrapperDirective',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController',

    'modules/saleAnalytics/filters/userFilter/UserFilterController',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/PieWidgetDirective',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetDirective',
    'modules/saleAnalytics/widgets/tableChart/TableChartWidgetDirective'
], function (BaseView, SaleAnalyticEventBus) {

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.dropZoneClassName = "dropzone";
        this.widgetContainerSelector = '.widgets-container[as-sortable]';
        this.fixedAreaSelector = '.fixedarea[as-sortable]';
        this.eventBus = SaleAnalyticEventBus.getInstance();
        this.configureEvents();
    }

    WidgetDecoratePageView.inherits(BaseView, {
        widgets: {
            get: function () {
                return this.$scope.widgets;
            },
            set: function (value) {
                this.$scope.widgets = value;
            }
        },
        pageName: {
            get: function () {
                return this.$scope.pageName;
            },
            set: function (value) {
                this.$scope.pageName = value;
            }
        }
    });

    WidgetDecoratePageView.prototype.configureEvents = function () {
        var self = this;
        self.eventBus.onRemovingWidget(self.onRemovingWidget.bind(self));
    };

    WidgetDecoratePageView.prototype.onRemovingWidget = function(widgetId){
        var self = this;
        self.widgets = self.widgets.filter(function(widget){
           return widget.widgetId !== widgetId;
        });
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

    };

    return WidgetDecoratePageView;
});