/**
 * Created by Justin on 1/5/2015.
 */

define([
    'config',
    'shared/BaseView',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'shared/services/config/PermissionsService',
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
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetDirective'
], function (config, BaseView, WidgetEventBus, WidgetAdministrationEventBus, PermissionsService, angular, $, _) {
    'use strict';

    function WidgetDecoratePageView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$scope = $scope;
        this.dropZoneClassName = "dropzone";
        this.widgetContainerSelector = '.widgets-container[as-sortable]';
        this.fixedAreaSelector = '.fixedarea[as-sortable]';
        this.eventBus = WidgetEventBus.getInstance();
        this.widgetAdministrationEventBus = WidgetAdministrationEventBus.getInstance();
        this.permissionsService = PermissionsService.newInstance();
        this.configureEvents();

      try{
        var hash = window.location.hash.split('#')[1];
        if( hash.indexOf("/analytics/reports") === -1 ){
          if(config.isWinter) {
            this.setupStickyFilters_winter();
          } else {
            this.setupStickyFilters();
          }
        }
      }catch(err){/* to avoid tests failing */}

        $scope.isReportsVisible = this.permissionsService.getPermission("reports_sfm.isEnabled", true);
        $scope.isMarketplaceVisible = this.permissionsService.getPermission("markeptlace_sfm.isEnabled", true);
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

    WidgetDecoratePageView.prototype.setupStickyFilters = function () {
        var contentDefaultMarginTop = parseInt($(".content").css("margin-top"), 10);
        var navBarHeight = 60;
        var marginTopAfterFixed = 70;
        var activateFixedFiltersScroll = 110;
        var onScroll = function(evt) {
            if ($(this).scrollTop() > activateFixedFiltersScroll) {
                $(".sales-filters-div").css("top", navBarHeight + "px");
                $(".content").css("margin-top", marginTopAfterFixed+"px");
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
                $(window).off("scroll", onScroll);
            }
        );
    };

    WidgetDecoratePageView.prototype.setupStickyFilters_winter = function () {
        var navBarHeight = 0;
        var navBarLeft = 0;
        var activateFixedFiltersScroll = 115;
        var onScroll = function(evt) {
            if ($(this).scrollTop() > activateFixedFiltersScroll) {
                if( $(".content.web4").css("margin-left") === '0px' ){
                    navBarHeight = 50;
                    navBarLeft = 0;
                } else {
                    navBarHeight = 0;
                    navBarLeft = 50;
                }
                $(".sales-filters-div").css({
                    position: "fixed",
                    zIndex: 1030,
                    backgroundColor: "#fff",
                    top: navBarHeight,
                    left: navBarLeft,
                    right: 0,
                    paddingLeft: "15px", paddingRight: "15px",
                    borderBottom: "1px solid #ccc"
                });
            } else {
                $(".sales-filters-div").css({
                    position: "relative",
                    top: "auto", left: "auto", right: "auto",
                    zIndex: "auto",
                    backgroundColor: "transparent",
                    paddingLeft: "0", paddingRight: "0",
                    borderBottom: "none"
                });
            }
        };
        $(window).scroll(onScroll);

        this.$scope.$on(
            "$destroy",
            function handleDestroyEvent() {
                $(window).off("scroll", onScroll);
            }
        );
    };

    WidgetDecoratePageView.prototype.configureEvents = function () {
        var self = this;

        self.widgetAdministrationEventBus.onRequestWidgetsList( function(){self.onRequestWidgetsList(); });
        self.widgetAdministrationEventBus.onMoveWidgetToIndex( function(widget, index){self.onMoveWidgetToIndex(widget, index);} );
        self.widgetAdministrationEventBus.onActivateWidget( function(widget){self._toggleActivateWidget(widget, true);} );
        self.widgetAdministrationEventBus.onDeactivateWidget( function(widget){self._toggleActivateWidget(widget, false);} );

        self.event.onWidgetMoved = function(widget, newIndex){
            // To be overriden by inheriting objects
        };

        self.fn.onWidgetDropped = function($ui, $widget) {
            var dropElementIndex = $ui.item.index();
            self.widgetAdministrationEventBus.fireMoveWidgetToIndex($widget, dropElementIndex);
        };

        self.fn.toggleWidgetAdministration = function(){
            WidgetAdministrationEventBus.getInstance().fireToggleWidgetAdministration();
        };

        self.adjustWidgetSizesInterval = setInterval( self.adjustWidgetSizes.bind(self), 250 );

        self.disposer = self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };

    WidgetDecoratePageView.prototype.adjustWidgetSizes = function () {
        var smallWidgets = $('div.widget-container.col-md-6:not(.hidden)');
        var maxHeight = 0;
        var anyIsExpanded = false;
        smallWidgets.each(function() {
            anyIsExpanded = $(this).find('.panel-expand').length > 0 || anyIsExpanded;
            var totalHeight = 0;
            var heading = $(this).find('.panel-heading');
            var panelBody = $(this).find('.panel-body');
            var toolbar = $(this).find('.panel-toolbar');
            var content = $(this).find('.panel-content');
            var description = $(this).find('.panel-description');
            totalHeight += $(heading).outerHeight(true);
            totalHeight += parseInt($(panelBody).css('padding-top'),10) + parseInt($(panelBody).css('padding-bottom'),10);
            if(toolbar.length > 0){
                totalHeight += $(toolbar).outerHeight(true);
            }
            totalHeight += $(content).outerHeight(true);
            if(description.length > 0){
                totalHeight += $(description).outerHeight(true);
            }
            maxHeight = Math.max( totalHeight, maxHeight );

        });
        if( !anyIsExpanded ){
            smallWidgets.each(function() {
                var panelBody = $(this).find('.panel-body');
                if( $(panelBody).hasClass('panel-is-minimized') ) {
                    $(this).css('height', 'auto');
                } else {
                    if( $(this).height() !== maxHeight ) {
                        $(this).height(maxHeight);
                    }
                }
            });
        }
    };


    WidgetDecoratePageView.prototype.onMoveWidgetToIndex = function (widget, newIndex) {
        this.event.onWidgetMoved (widget, newIndex);
    };

    WidgetDecoratePageView.prototype._toggleActivateWidget = function (widget, isActive) {
        this.event.onWidgetVisibilityToggled(widget, isActive);
    };

    WidgetDecoratePageView.prototype.onDisposing = function () {
        var self = this;
        self.widgetAdministrationEventBus.unsubscribeToggleWidgetAdministration();
        self.widgetAdministrationEventBus.unsubscribeWidgetsLoaded();
        self.widgetAdministrationEventBus.unsubscribeRequestWidgetsList();
        self.widgetAdministrationEventBus.unsubscribeMoveWidgetToIndex();
        self.widgetAdministrationEventBus.unsubscribeActivateWidget();
        self.widgetAdministrationEventBus.unsubscribeDeactivateWidget();
        clearInterval(self.adjustWidgetSizesInterval);
        self.disposer();
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
