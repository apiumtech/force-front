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

        var hash = window.location.hash.split('#')[1];
        if( hash.indexOf("/analytics/reports") == -1 ){
            this.setupFixedFilters();
        }
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

    WidgetDecoratePageView.prototype.setupFixedFilters = function () {
        var contentDefaultMarginTop = parseInt($(".content").css("margin-top"), 10);
        var navBarHeight = 60;
        var submenuHeight = 94;
        var paddingsYcosasDeEstas = 12;
        var activateFixedFiltersScroll = (navBarHeight + submenuHeight) - (contentDefaultMarginTop+paddingsYcosasDeEstas);
        var filtersHeight = 119;
        var onScroll = function(evt) {
            if ($(this).scrollTop() > activateFixedFiltersScroll) {
                $(".sales-filters-div").css("top", navBarHeight + "px");
                $(".content").css("margin-top", (contentDefaultMarginTop+filtersHeight)+"px");
                $(".sales-filters-div").css({
                    position: "fixed",
                    zIndex: 1030,
                    backgroundColor: "white",
                    left: 0, right: 0,
                    paddingLeft: "15px", paddingRight: "15px"
                });
                $(".sales-filters-div .line-border").css({
                    marginLeft: "-15px",
                    marginRight: "-15px"
                });
            } else {
                $(".content").css("margin-top", contentDefaultMarginTop+"px");
                $(".sales-filters-div").css({
                    position: "relative",
                    top: "auto",
                    zIndex: "auto",
                    backgroundColor: "transparent",
                    left: "auto", right: "auto",
                    paddingLeft: "0", paddingRight: "0"
                });
                $(".sales-filters-div .line-border").css({
                    marginLeft: "0",
                    marginRight: "0"
                });
            }
        };
        $(window).scroll(onScroll);

        this.$scope.$on(
            "$destroy",
            function handleDestroyEvent() {
                console.log("handleDestroyEvent");
                $(window).off("scroll", onScroll);
            }
        );
    };

    WidgetDecoratePageView.prototype.configureEvents = function () {
        var self = this;
        //self.eventBus.onRemovingWidget(self.onRemovingWidget.bind(self));

        self.widgetAdministrationEventBus.onRequestWidgetsList( function(){self.onRequestWidgetsList(); });
        self.widgetAdministrationEventBus.onMoveWidgetToIndex( function(widget, index){self.onMoveWidgetToIndex(widget, index);} );
        self.widgetAdministrationEventBus.onActivateWidget( function(widget){self.toggleActivateWidget(widget, true);} );
        self.widgetAdministrationEventBus.onDeactivateWidget( function(widget){self.toggleActivateWidget(widget, false);} );

        self.event.onWidgetMoved = function(widget, newIndex){
            // To be overriden by inheriting objects
        };

        self.fn.onWidgetDropped = function($ui, $widget) {
            var movingElement = $("[data-widgetid=widget-"+ $widget.widgetId +"]");
            var dropElementIndex = $ui.item.index();
            self.widgetAdministrationEventBus.fireMoveWidgetToIndex($widget, dropElementIndex);
        };

        self.fn.toggleWidgetAdministration = function(){
            WidgetAdministrationEventBus.getInstance().fireToggleWidgetAdministration();
        };

        self.disposer = self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };


    WidgetDecoratePageView.prototype.onMoveWidgetToIndex = function (widget, newIndex) {
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
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetToIndex();
        self.widgetAdministrationEventBus.unsubscribeActivateWidget();
        self.widgetAdministrationEventBus.unsubscribeDeactivateWidget();
        self.disposer();
    };

    /*WidgetDecoratePageView.prototype.onRemovingWidget = function(widgetId){
        var self = this;
        self.widgets = self.widgets.filter(function(widget){
           return widget.widgetId !== widgetId;
        });
    };*/

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