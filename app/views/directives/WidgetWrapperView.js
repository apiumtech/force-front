/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');

    function WidgetWrapperView($scope, $element) {
        BaseView.call(this, $scope);
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

        };

        this.fn.closeWidget = function () {
            self.element.remove();
        };
    }

    WidgetWrapperView.prototype = Object.create(BaseView.prototype);

    return WidgetWrapperView;
});