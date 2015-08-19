/**
 * Created by Justin on 1/5/2015.
 */

define([
    'shared/BaseView',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'angular',

    'modules/widgets/WidgetWrapperDirective',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController',

    'modules/saleAnalytics/filters/userFilter/UserFilterController',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/PieWidgetDirective',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetDirective',
    'modules/saleAnalytics/widgets/tableChart/TableChartWidgetDirective',
    'modules/saleAnalytics/widgets/custom/CustomWidgetDirective',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationController'
], function (BaseView, WidgetEventBus, WidgetAdministrationEventBus, angular) {

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$scope = $scope;
        this.dropZoneClassName = "dropzone";
        this.widgetContainerSelector = '.widgets-container[as-sortable]';
        this.fixedAreaSelector = '.fixedarea[as-sortable]';
        this.eventBus = WidgetEventBus.getInstance();
        this.widgetAdministrationEventBus = WidgetAdministrationEventBus.getInstance();
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
        self.widgetAdministrationEventBus.onRequestWidgetsList(function(){
            self.onRequestWidgetsList();
        });
        self.disposer = self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };

    WidgetDecoratePageView.prototype.onDisposing = function () {
        var self = this;
        self.widgetAdministrationEventBus.unsubscribeToggleWidgetAdministration();
        self.widgetAdministrationEventBus.unsubscribeWidgetsLoaded();
        self.widgetAdministrationEventBus.unsubscribeRequestWidgetsList();
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetLeft();
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetRight();
        self.disposer();
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
        this.widgetAdministrationEventBus.fireWidgetsLoaded({
            widgets:angular.copy(this.widgets),
            pageName:this.pageName
        });
    };

    WidgetDecoratePageView.prototype.onRequestWidgetsList = function () {
        if( this.widgets ){
            this.widgetAdministrationEventBus.fireWidgetsLoaded({
                widgets:angular.copy(this.widgets),
                pageName:this.pageName
            });
        }
    };

    WidgetDecoratePageView.prototype.getElementIndex = function (element) {
        return $(element).index();
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {

    };

    return WidgetDecoratePageView;
});