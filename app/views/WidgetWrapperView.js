/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');

    function WidgetWrapperView($scope, $element) {
        BaseView.call(this, $scope);
        this.element = $element || {};
        var self = this;
        setTimeout(function () {

            console.log($(self.element).parent().attr("data-widgetid"));
        }, 0);
        $scope.isExpanded = false;
        $scope.isLoading = false;
        $scope.hasError = false;

        this.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        this.fn.expandPanel = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        this.fn.reloadPanel = function () {
            $scope.isLoading = true;
            self.reloadWidgetChannel.sendReloadSignal();
        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };

        setTimeout(function () {
            self.createEventBusChannel();
        }, 0);
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype);

    WidgetWrapperView.prototype.__show = BaseView.prototype.show;
    WidgetWrapperView.prototype.show = function () {
        this.__show.call(this);
        this.$scope.widgetTemplate = '<div ng-include="widget.template"></div>';
    };

    WidgetWrapperView.prototype.createEventBusChannel = function () {
        var self = this;
        var widgetName = self.element.attr("data-widgetname");
        self.reloadWidgetChannel = self._getReloadWidgetChannelInstance(widgetName);
        self.reloadWidgetChannel.listen(function (event) {
            if (event.reloadCompleted) {
                self.$scope.isLoading = false;
                self.$scope.hasError = event.reloadError;
                self.$scope.errorMessage = (event.reloadError) ? event.errorMessage : null;
            }
        });
    };

    WidgetWrapperView.prototype._getReloadWidgetChannelInstance = function (widgetName) {
        return ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
    };

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});