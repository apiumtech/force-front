/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function BaseView($scope) {
        this.$scope = $scope || {};
        this.event = {};
        this.fn = {};
        this.data = {};

        $scope.event = this.event;
        $scope.fn = this.fn;
        $scope.data = this.data;
    }

    BaseView.prototype.showError = function (error) {

    };

    return BaseView;
});