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

        this.fn.onDragStart = function (event, ui) {
            console.log("Widget is moving", self, event, ui);
        };

        this.fn.onDragStop = function (event, ui) {
            console.log("Widget is moved", self, event, ui);
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
                __beforeDragColumn, __afterDragColumn,
                __beforeDragRow, __afterDragRow;

            var handler = ".panel-heading";
            var connector = ".drag-and-drop";

            var dragAndDropables = $(".drag-and-drop");
            dragAndDropables.sortable({
                handle: handler,
                connectWith: connector,
                start: function (event, ui) {
                    var _currentMovingWidget = ui.item.closest(wrapperContainer),
                        _currentColumnOfMovingWidget = _currentMovingWidget.closest(connector);

                    __beforeDragPosition = _currentMovingWidget.index();
                    __beforeDragColumn = _currentColumnOfMovingWidget.data("widgetcolumn");
                    __beforeDragRow = _currentColumnOfMovingWidget.data("widgetrow");
                },
                stop: function (event, ui) {
                    var _currentMovingWidget = ui.item.closest(wrapperContainer),
                        _currentColumnOfMovingWidget = _currentMovingWidget.closest(connector);

                    __afterDragPosition = _currentMovingWidget.index();
                    __afterDragColumn = _currentColumnOfMovingWidget.data("widgetcolumn");
                    __afterDragRow = _currentColumnOfMovingWidget.data("widgetrow");

                    var currentMovingViewInstance = _currentMovingWidget.data("WrapperView");
                    if (currentMovingViewInstance) {
                        currentMovingViewInstance.fn.sendMoveSignal({
                            order: __beforeDragPosition,
                            column: __beforeDragColumn,
                            row: __beforeDragRow
                        }, {
                            order: __afterDragPosition,
                            column: __afterDragColumn,
                            row: __afterDragRow
                        }, event);
                    }
                }
            });
            dragAndDropables.data("isSortable", true);
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