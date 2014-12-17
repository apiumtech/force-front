/**
 * Created by xavi on 12/16/14.
 */

app.registerView(function (container) {
    var LeftMenuPresenter = container.getPresenter('presenters/LeftMenuPresenter');

    function LeftMenuView($scope, $presenter) {
        this.event = {};
        this.fn = {};

        this.$scope = $scope;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.presenter = $presenter;
    }

    LeftMenuView.prototype.show = function () {
        this.presenter.show(this);
    };

    LeftMenuView.newInstance = function ($scope, $presenter) {
        var scope = $scope || {};
        var presenter = $presenter || LeftMenuPresenter.newInstance().getOrElse(throwException("LeftMenuPresenter could not be instantiated!!"));

        var view = new LeftMenuView(scope, presenter);

        return Some(view);
    };

    return {newInstance: LeftMenuView.newInstance};
});
