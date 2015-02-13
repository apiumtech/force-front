/**
 * Created by trung.dang on 02/12/2015
 */
app.registerView(function (container) {
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    var AccountFilterPresenter = container.getPresenter('presenters/Account/AccountFilterPresenter');
    var FilterModel = container.getModel('models/Account/AccountFilterModel');

    function FilterView($scope, $model, $presenter) {
        this.data = {};
        this.event = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;

        this.data.showAvailableFilters = false;
        this.data.showAvailableOwners = false;

        this.model = $model;
        this.presenter = $presenter;
    }

    FilterView.prototype.show = function () {
        this.presenter.show(this, this.model);
    };

    FilterView.prototype.showAvailableFilters = function (filters) {
        this.data.showAvailableFilters = true;
        this.data.availableFilters = filters;
    };

    FilterView.prototype.showFilters = function (filters) {
        this.data.customFilters = filters;
        this.data.showAvailableFilters = true;
        this.data.availableFilters = [];
    };

    FilterView.prototype.showAvailableOwners = function (owners) {
        this.data.showAvailableOwners = true;
        this.data.availableOwners = owners;
    };

    FilterView.prototype.showCustomFilters = function (filters) {
        this.data.customFilters = filters;
    };

    FilterView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    FilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || FilterModel.newInstance().getOrElse(throwException("AccountFilterModel could not be instantiated!!"));
        var presenter = $presenter || AccountFilterPresenter.newInstance().getOrElse(throwException("AccountFilterPresenter could not be instantiated!!"));

        var view = new FilterView(scope, model, presenter);

        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(view);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(view);
        }

        return Some(view);
    };

    return FilterView;
});