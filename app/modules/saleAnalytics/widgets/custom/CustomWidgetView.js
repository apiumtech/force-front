define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/custom/CustomWidgetModel',
    'modules/saleAnalytics/widgets/custom/CustomWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'jquery'
], function (WidgetBaseView, CustomWidgetModel, CustomWidgetPresenter, BaseWidgetEventBus, $) {
    'use strict';

    function CustomWidgetView(scope, element, presenter, $compile) {
        presenter = presenter || new CustomWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        this.$compile = $compile;
        this.configureEvents();
    }

    CustomWidgetView.inherits(WidgetBaseView, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    CustomWidgetView.prototype.configureEvents = function () {
        var self = this;
        this.eventChannel.onReloadCommandReceived(this.onReloadCommandReceived.bind(this));

        self.event.customDataAccess = function(){};
        this.fn.customDataAccess = function(callbackEventName, storedName, storedParams) {
            self.event.customDataAccess(storedName, storedParams).then(function(result){
                var event = new CustomEvent(callbackEventName, {'detail': result});
                window.dispatchEvent(event);
            });
        };
    }


    CustomWidgetView.prototype.getCustomWidgetDivId = function(){
        return '#customWidget' + this.widget.widgetId;
    };
    CustomWidgetView.prototype.getCustomWidgetDiv = function(){
        return $( this.getCustomWidgetDivId() );
    };
    CustomWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        if(!this.isHTMLAlreadyInjected) {
            data = this.widget.widgetContent;
            var htmlSrc = this.$compile(data)(this.$scope);
            this.getCustomWidgetDiv().html(htmlSrc);
            this.isHTMLAlreadyInjected = true;
        }
    };


    CustomWidgetView.newInstance = function ($scope, $element, $compile, $viewRepAspect, $logErrorAspect) {
        var view = new CustomWidgetView($scope, $element, undefined, $compile);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return CustomWidgetView;
});