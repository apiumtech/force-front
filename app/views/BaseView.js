/**
 * Created by justin on 12/18/14.
 */
app.registerView(function (container) {

    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function BaseView($scope, $model, $presenter) {
        this.data = {};
        this.event = {};
        this.fn = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.model = $model;
        this.presenter = $presenter;
    }

    BaseView.prototype.showError = function (error) {

    };

    return BaseView;
});