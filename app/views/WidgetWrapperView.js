/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');

    function WidgetWrapperView($scope, $element) {
        BaseView.call(this, $scope);
        this.element = $element || {};
        var self = this;

        $scope.isExpanded = false;
        $scope.isLoading = false;
        $scope.hasError = false;

        WidgetWrapperView.configureEvents(self);
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype, {});

    WidgetWrapperView.configureEvents = function (instance) {
        var self = instance,
            $scope = self.$scope;

        self.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        self.fn.expandPanel = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        self.fn.reloadPanel = function () {
            self.widgetEventChannel.sendReloadSignal();
        };

        self.fn.closeWidget = function () {
            self.element.remove();
        };

        self.fn.initWidget = function (widget) {
            var widgetName = widget.widgetType + "||" + widget.widgetId;
            self.widget = widget;
            self.widgetEventChannel = WidgetWrapperView._getWidgetChannelInstance(widgetName);
            self.widgetEventChannel.onReloadSignalReceived(self.showLoading.bind(self));
            self.widgetEventChannel.onReloadCompleteSignalReceived(self.onReloadCompleteSignalReceived.bind(self));
        };

        $scope.$on("$destroy", function () {
            self.widgetEventChannel = null;
        });
    };

    WidgetWrapperView.prototype.showLoading = function () {
        var self = this;

        self.$scope.isLoading = true;
    };

    WidgetWrapperView.prototype.onReloadCompleteSignalReceived = function (reloadError, errorMessage) {
        var self = this;

        self.$scope.isLoading = false;
        self.$scope.hasError = reloadError;
        self.$scope.errorMessage = (reloadError) ? errorMessage : null;
    };

    WidgetWrapperView._getWidgetChannelInstance = function (widgetName) {
        return WidgetEventBus.newInstance(widgetName);
    };

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});