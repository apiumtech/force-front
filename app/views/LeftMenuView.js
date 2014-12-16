/**
 * Created by xavi on 12/16/14.
 */

app.registerView(function (container) {
    var LeftMenuPresenter = container.getPresenter('presenters/LeftMenuPresenter');

    function LeftMenuView($scope, $presenter) {
        this.event = {};
        this.$scope = $scope;
        $scope.event = this.event;
        this.presenter = $presenter;
    }

    LeftMenuView.prototype.show = function () {
        this.presenter.show(this);
    };

    LeftMenuView.prototype.toggleAnalyticsSubmenu = function (target) {
        var element = angular.element(target);
        if (element.slideToggle) element.slideToggle(250);
    };

    LeftMenuView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var presenter = $presenter || LeftMenuPresenter.newInstance().getOrElse(throwException("LeftMenuPresenter could not be instantiated!!"));

        var view = new LeftMenuView(scope, presenter);

        return Some(view);
    };

    return {newInstance: LeftMenuView.newInstance};
});
