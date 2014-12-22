/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');

    function WidgetWrapperView($scope, $element) {
        BaseView.call(this, $scope);
        this.reloadWidgetChannel = ReloadWidgetChannel.newInstance().getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        this.element = $element;
        var self = this;
        $scope.isExpanded = false;

        this.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        this.fn.expandPanel = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        this.fn.reloadPanel = function () {
            self.reloadWidgetChannel.send({reloadWidget: true});
        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype);

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope || {}, $element || {});
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});