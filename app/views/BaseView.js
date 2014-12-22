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

    BaseView.prototype.show = function () {
        this.presenter.show(this, this.model);
    };

    BaseView.prototype.showError = function (error) {
        this.presenter.showError(error);
    };

    BaseView.prototype._injectAspects = function ($viewRepAspect, $logErrorAspect) {
        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(this);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(this);
        }

        return Some(this);
    };


    return BaseView;
});