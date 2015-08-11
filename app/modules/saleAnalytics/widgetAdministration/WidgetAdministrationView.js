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
        self.configureEvents();
    }

    WidgetAdministrationView.inherits(BaseView, {});

    WidgetAdministrationView.prototype.configureEvents = function() {
        var self = this;
        self.widgetAdministrationEventBus.onToggleWidgetAdministration( function(){
            self.onToggleWidgetAdministration();
        });
    };

    WidgetAdministrationView.prototype.onToggleWidgetAdministration = function () {
        $("#WidgetAdministrationContainer").slideToggle("slow");
    };



    WidgetAdministrationView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new WidgetAdministrationView($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return WidgetAdministrationView;
});