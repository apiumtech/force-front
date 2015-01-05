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
            $scope.isLoading = true;
            self.widgetEventChannel.sendReloadSignal();
        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };

        this.fn.initWidget = function (widget) {
            var widgetName = widget.widgetType + "||" + widget.widgetId;
            self.widget = widget;
            self.widgetEventChannel = self._getWidgetChannelInstance(widgetName);
            self.widgetEventChannel.onReloadCompleteSignalReceived(function (reloadError, errorMessage) {
                self.$scope.isLoading = false;
                self.$scope.hasError = reloadError;
                self.$scope.errorMessage = (reloadError) ? errorMessage : null;
            });

            self.fn.bindDraggableEvents();
        };

        this.fn.bindDraggableEvents = function () {
            // map the dom to current view instance
            var wrapperContainer = ".widget-container";
            var wrapper = self.element.closest(wrapperContainer);
            wrapper.data("WrapperView", self);

            var dragAndDropPanel = self.element.closest(".drag-and-drop");

            if (!dragAndDropPanel.length || dragAndDropPanel.data("isSortable")) {
                return;
            }

            // sortable jquery can only be bound once, so exit if already bound
            var __beforeDragPosition, __afterDragPosition,
                __beforeDragColumn, __afterDragColumn;
            var handler = ".panel-heading";
            var connector = ".drag-and-drop";
            dragAndDropPanel.sortable({
                handle: handler,
                connectWith: connector,
                start: function (event, ui) {
                    var _currentMovingWidget = ui.item.closest(wrapperContainer),
                        _currentColumnOfMovingWidget = _currentMovingWidget.closest(connector);

                    __beforeDragPosition = _currentMovingWidget.index();
                    __beforeDragColumn = _currentColumnOfMovingWidget.index();
                },
                stop: function (event, ui) {
                    var _currentMovingWidget = ui.item.closest(wrapperContainer),
                        _currentColumnOfMovingWidget = _currentMovingWidget.closest(connector);

                    __afterDragPosition = _currentMovingWidget.index();
                    __afterDragColumn = _currentColumnOfMovingWidget.index();

                    var currentMovingViewInstance = _currentMovingWidget.data("WrapperView");
                    if (currentMovingViewInstance) {
                        currentMovingViewInstance.fn.sendMoveSignal({
                            order: __beforeDragPosition,
                            column: __beforeDragColumn
                        }, {
                            order: __afterDragPosition,
                            column: __afterDragColumn
                        }, event);
                    }
                }
            });
            dragAndDropPanel.data("isSortable", true);
        };

        this.fn.sendMoveSignal = function (oldPosition, newPosition, event) {
            self.widgetEventChannel.sendMoveSignal(oldPosition, newPosition, event);
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