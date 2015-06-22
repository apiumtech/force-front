define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/custom/CustomWidgetModel',
    'modules/saleAnalytics/widgets/custom/CustomWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus'
], function (WidgetBaseView, CustomWidgetModel, CustomWidgetPresenter, BaseWidgetEventBus) {
    'use strict';

    function CustomWidgetView(scope, element, presenter) {
        presenter = presenter || new CustomWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
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
        var eventChannel = this.eventChannel;
        eventChannel.onReloadCommandReceived(this.onReloadCommandReceived.bind(this));
    };

    CustomWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        // TODO: inject the recieved HTML into the widget
        console.log(data);
    };

    CustomWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new CustomWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return CustomWidgetView;
});