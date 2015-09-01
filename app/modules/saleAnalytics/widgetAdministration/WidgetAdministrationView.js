define([
    'shared/BaseView',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationPresenter',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'jquery'
], function (BaseView, WidgetAdministrationPresenter, WidgetAdministrationEventBus, $) {
    'use strict';

    function WidgetAdministrationView($scope, presenter) {
        presenter = presenter || new WidgetAdministrationPresenter();
        BaseView.call(this, $scope, null, presenter);

        var self = this;
        self.widgetAdministrationEventBus = WidgetAdministrationEventBus.getInstance();
        self.data.widgetsAvailable = false;
        self.data.selectedWidgetId = null;

        self.configureEvents();
    }

    WidgetAdministrationView.inherits(BaseView, {});

    WidgetAdministrationView.prototype.configureEvents = function() {
        var self = this;

        self.widgetAdministrationEventBus.onToggleWidgetAdministration( function(){
            self.onToggleWidgetAdministration();
        });

        self.widgetAdministrationEventBus.onWidgetsLoaded( function(payload){
            self.onWidgetsLoaded(payload);
        });

        self.fn.getWidgetSampleImage = function (widget) {
            return "assets/images/chart-sample.png";
        };

        self.fn.toggleWidgetIsActive = function (widget) {
            if(widget.isActive){
                widget.isActive = false;
                self.data.selectedWidgetId = null;
                self.widgetAdministrationEventBus.fireDeactivateWidget(widget);
            } else {
                widget.isActive = true;
                self.widgetAdministrationEventBus.fireActivateWidget(widget);
            }
        };

        self.fn.toggleWidgetSelected = function (widget) {
            if(widget.widgetId == self.data.selectedWidgetId || !widget.isActive){
                return;
            }
            self.data.selectedWidgetId = widget.widgetId;
            setTimeout( function(){
                $('[data-toggle=tooltip]').tooltip();
            }, 500 );
        };

        self.fn.moveWidgetLeft = function (widget) {
            self.widgetAdministrationEventBus.fireMoveWidgetLeft(widget);
            self.widgetAdministrationEventBus.fireRequestWidgetsList();
        };

        self.fn.moveWidgetRight = function (widget) {
            self.widgetAdministrationEventBus.fireMoveWidgetRight(widget);
            self.widgetAdministrationEventBus.fireRequestWidgetsList();
        };

        self.fn.onInit = function () {
            if(!self.data.widgetsAvailable){
                self.widgetAdministrationEventBus.fireRequestWidgetsList();
            }
        };

        self.widgetAdministrationEventBus.onMoveWidgetToIndex(function(widget, index){
            self.onMoveWidgetToIndex(widget, index);
        });
    };

    WidgetAdministrationView.prototype.onToggleWidgetAdministration = function () {
        $("#WidgetAdministrationContainer").slideToggle("slow");
    };

    WidgetAdministrationView.prototype.onMoveWidgetToIndex = function (widget, newIndex) {
        $("[data-widgetid=widget-"+ widget.widgetId +"]").index(newIndex);
        this.widgetAdministrationEventBus.fireRequestWidgetsList();
    };

    WidgetAdministrationView.prototype.onWidgetsLoaded = function (payload) {
        var self = this;
        self.pageName = payload.pageName;
        self.data.widgets = payload.widgets;
        self.data.widgetsAvailable = true;
    };

    WidgetAdministrationView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new WidgetAdministrationView($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return WidgetAdministrationView;
});