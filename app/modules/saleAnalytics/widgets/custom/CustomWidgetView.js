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
        scope.$on('$destroy', this.onDestroy.bind(this));
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
        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.event.customDataAccess = function(){};
        self.fn.customDataAccess = function(callbackEventName, storedName, storedParams) {
            self.event.customDataAccess(storedName, storedParams).then(function(result){
                var event = new CustomEvent(callbackEventName, {'detail': result});
                window.dispatchEvent(event);
            });
        };


        this._dateFilterApplySignal = (function(dateRange){
          var event = new CustomEvent('dateRangeChanged', {'detail': { 'data': dateRange, 'widgetId': this.widget.widgetId }});
          window.dispatchEvent(event);
        }).bind(self);
        self.filterChannel.onDateFilterApplySignalReceived(this._dateFilterApplySignal);

        this._userFilterApplySignal = (function(users){
          var event = new CustomEvent('userFilterChanged', {'detail': { 'data': users, 'widgetId': this.widget.widgetId }});
          window.dispatchEvent(event);
        }).bind(self);
        self.filterChannel.onUserFilterApplySignalReceived(this._userFilterApplySignal);
    };

    CustomWidgetView.prototype.onDestroy = function() {
        this.filterChannel.unsubscribeCallback(this._dateFilterApplySignal);
        this.filterChannel.unsubscribeCallback(this._userFilterApplySignal);
    };

    CustomWidgetView.prototype.getCustomWidgetDivId = function(){
        return '#customWidget' + this.widget.widgetId;
    };
    CustomWidgetView.prototype.getCustomWidgetDiv = function(){
        return $( this.getCustomWidgetDivId() );
    };
    CustomWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        data = this.widget.widgetContent;
        var htmlSrc = this.$compile(data)(this.$scope);
        this.getCustomWidgetDiv().html(htmlSrc);
    };


    CustomWidgetView.newInstance = function ($scope, $element, $compile, $viewRepAspect, $logErrorAspect) {
        var view = new CustomWidgetView($scope, $element, undefined, $compile);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return CustomWidgetView;
});
