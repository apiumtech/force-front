/**
 * Created by Justin on 1/5/2015.
 */

define([
    'shared/BaseView',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'angular',
    'jquery',
    'underscore',

    'modules/widgets/WidgetWrapperDirective',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController',

    'modules/saleAnalytics/filters/userFilter/UserFilterController',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/PieWidgetDirective',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetDirective',
    'modules/saleAnalytics/widgets/tableChart/TableChartWidgetDirective',
    'modules/saleAnalytics/widgets/custom/CustomWidgetDirective',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationController'
], function (BaseView, WidgetEventBus, WidgetAdministrationEventBus, angular, $, _) {

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

        self.widgetAdministrationEventBus.onRequestWidgetsList( function(){self.onRequestWidgetsList(); });
        self.widgetAdministrationEventBus.onMoveWidgetLeft( function(widget){self.onMoveWidgetLeft(widget);} );
        self.widgetAdministrationEventBus.onMoveWidgetRight( function(widget){self.onMoveWidgetRight(widget);} );
        self.widgetAdministrationEventBus.onActivateWidget( function(widget){self.toggleActivateWidget(widget, true);} );
        self.widgetAdministrationEventBus.onDeactivateWidget( function(widget){self.toggleActivateWidget(widget, false);} );

        self.event.onWidgetMoved = function(widget, newIndex){
            // To be overriden by inheriting objects
        };

        self.disposer = self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };


    WidgetDecoratePageView.prototype.onMoveWidgetLeft = function (widget) {
        var movingElement = $("[data-widgetid=widget-"+ widget.widgetId +"]");
        var newIndex = Math.max(0, this.getElementIndex(movingElement)-1);
        this.event.onWidgetMoved (widget, newIndex);
    };

    WidgetDecoratePageView.prototype.onMoveWidgetRight = function (widget) {
        var movingElement = $("[data-widgetid=widget-"+ widget.widgetId +"]");
        var newIndex = Math.min(this.widgets.length-1, this.getElementIndex(movingElement)+1);
        this.event.onWidgetMoved (widget, newIndex);
    };

    WidgetDecoratePageView.prototype.toggleActivateWidget = function (widget, isActive) {
        var self = this;
        var currentWidget = _.findWhere(self.widgets, {widgetId: widget.widgetId});
        if(currentWidget){
            currentWidget.isActive = isActive;
        }
    };

    WidgetDecoratePageView.prototype.onDisposing = function () {
        var self = this;
        self.widgetAdministrationEventBus.unsubscribeToggleWidgetAdministration();
        self.widgetAdministrationEventBus.unsubscribeWidgetsLoaded();
        self.widgetAdministrationEventBus.unsubscribeRequestWidgetsList();
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetLeft();
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetRight();
        self.widgetAdministrationEventBus.unsubscribeActivateWidget();
        self.widgetAdministrationEventBus.unsubscribeDeactivateWidget();
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
        this._fireWidgetsLoaded();
    };

    WidgetDecoratePageView.prototype.onRequestWidgetsList = function () {
        if( this.widgets ){
            this._fireWidgetsLoaded();
        }
    };

    WidgetDecoratePageView.prototype._fireWidgetsLoaded = function () {
        this.widgetAdministrationEventBus.fireWidgetsLoaded({
            widgets:angular.copy(this.widgets),
            pageName:this.pageName
        });
    };

    WidgetDecoratePageView.prototype.getElementIndex = function (element) {
        return $(element).index();
    };

    WidgetDecoratePageView.prototype.onWidgetsLoadFail = function (error) {

    };

    return WidgetDecoratePageView;
});