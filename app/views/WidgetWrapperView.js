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

        self.configureEvents();
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype, {});

    WidgetWrapperView.prototype.configureEvents = function () {
        var self = this,
            $scope = self.$scope;

        this.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        this.fn.expandPanel = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        this.fn.reloadPanel = function () {
            self.widgetEventChannel.sendReloadSignal();
        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };

        this.fn.initWidget = function (widget) {
            var widgetName = widget.widgetType + "||" + widget.widgetId;
            self.widget = widget;
            self.widgetEventChannel = self._getWidgetChannelInstance(widgetName);
            self.widgetEventChannel.onReloadSignalReceived(function () {
                $scope.isLoading = true;
            });
            self.widgetEventChannel.onReloadCompleteSignalReceived(function (reloadError, errorMessage) {
                self.$scope.isLoading = false;
                self.$scope.hasError = reloadError;
                self.$scope.errorMessage = (reloadError) ? errorMessage : null;
            });
        };
    };

    WidgetWrapperView.prototype._getWidgetChannelInstance = function (widgetName) {
        return WidgetEventBus.newInstance(widgetName).getOrElse(throwInstantiateException(WidgetEventBus));
    };

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});