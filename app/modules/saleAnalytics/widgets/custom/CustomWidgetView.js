define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/custom/CustomWidgetModel',
    'modules/saleAnalytics/widgets/custom/CustomWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus'
], function (WidgetBaseView, CustomWidgetModel, CustomWidgetPresenter, BaseWidgetEventBus) {
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
        var eventChannel = this.eventChannel;
        eventChannel.onReloadCommandReceived(this.onReloadCommandReceived.bind(this));
    };

    CustomWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var htmlSrc = this.$compile(data)(this.$scope);
        var el = '#customWidget' + this.widget.widgetId;
        $(el).html(htmlSrc);
    };

    CustomWidgetView.newInstance = function ($scope, $element, $compile, $viewRepAspect, $logErrorAspect) {
        var view = new CustomWidgetView($scope, $element, undefined, $compile);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return CustomWidgetView;
});