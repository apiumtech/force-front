define([
    'shared/BaseView',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationPresenter',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus'
], function (BaseView, WidgetAdministrationPresenter, WidgetAdministrationEventBus) {
    'use strict';

    function WidgetAdministrationView($scope, presenter) {
        presenter = presenter || new WidgetAdministrationPresenter();
        BaseView.call(this, $scope, null, presenter);

        var self = this;
        self.widgetAdministrationEventBus = WidgetAdministrationEventBus.getInstance();
        self.data.widgetsAvailable = false;

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

        self.fn.onInit = function () {
            if(!self.data.widgetsAvailable){
                self.widgetAdministrationEventBus.fireRequestWidgetsList();
            }
        };

        self.fn.getWidgetSampleImage = function (widget) {
            return "assets/images/chart-sample.png";
        };

        self.fn.toggleWidgetIsActive = function (widget) {
            widget.isActive = !widget.isActive;
            // TODO: server side / sessionStorage integration
        };

        self.fn.toggleWidgetSelected = function (widget) {
            if(widget.$selected){
                return;
            }
            self.data.widgets.forEach(function(wdg){
                wdg.$selected = false;
            });
            widget.$selected = true;
        };
    };

    WidgetAdministrationView.prototype.onToggleWidgetAdministration = function () {
        $("#WidgetAdministrationContainer").slideToggle("slow");
    };

    WidgetAdministrationView.prototype.onWidgetsLoaded = function (payload) {
        var self = this;
        if(!self.data.widgetsAvailable) {
            self.pageName = payload.pageName;
            self.data.widgets = payload.widgets;
            self.data.widgetsAvailable = true;
        }
    };

    WidgetAdministrationView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new WidgetAdministrationView($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return WidgetAdministrationView;
});