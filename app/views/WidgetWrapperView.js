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
        $scope.isExpanded = false;
        $scope.isLoading = false;
        $scope.hasError = false;

        setTimeout(function () {
            var widgetName = self.element.attr("data-widgetname");
            self.reloadWidgetChannel = ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));

            self.reloadWidgetChannel.listen(function (event) {
                if (event.reloadCompleted) {
                    $scope.isLoading = false;
                    $scope.hasError = event.reloadError;
                    $scope.errorMessage = (event.reloadError) ? event.errorMessage : null;
                }
            });
        }, 0);

        this.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        this.fn.expandPanel = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        this.fn.reloadPanel = function () {
            $scope.isLoading = true;
            self.reloadWidgetChannel.send({reloadWidget: true});
        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype);

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});