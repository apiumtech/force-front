/**
 * Created by kevin on 11/5/14.
 */
define([
    'shared/aspects/ViewRepaintAspect',
    'shared/aspects/LogErrorAspect',
    'modules/account/filters/Filter/FilterPresenter',
    'modules/account/filters/Filter/FilterModel'
], function (ViewRepaintAspect, LogErrorAspect, FilterPresenter, FilterModel) {

    function FilterView($scope, $model, $presenter) {
        this.data = {};
        this.event = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;

        this.data.showAvailableFilters = false;
        this.data.setAvailableOwners = false;

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

    FilterView.prototype.setAvailableOwners = function (owners) {
        this.data.setAvailableOwners = true;
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
        var model = $model || FilterModel.newInstance();
        var presenter = $presenter || FilterPresenter.newInstance();

        var view = new FilterView(scope, model, presenter);

        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(view);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(view);
        }

        return view;
    };

    return FilterView;
});