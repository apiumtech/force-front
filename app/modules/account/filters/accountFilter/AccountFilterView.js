/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'underscore',
    'shared/aspects/ViewRepaintAspect',
    'shared/aspects/LogErrorAspect',
    'shared/BaseView',
    'modules/account/filters/accountFilter/AccountFilterPresenter',
    'modules/account/filters/accountFilter/AccountFilterModel',
    'shared/services/AwaitHelper'
], function (_, ViewRepaintAspect, LogErrorAspect, BaseView, AccountFilterPresenter, AccountFilterModel, AwaitHelper) {

    function AccountFilterView($scope, $presenter) {
        $presenter = $presenter || new AccountFilterPresenter();
        BaseView.call(this, $scope, null, $presenter);

        this.data.selectedView = null;
        this.data.searchQuery = "";
        this.data.AccountTypeFilter = '';
        this.data.EnvFilter = '';
        this.data.ownerFilter = '';
        this.data.availableFields = [];
        this.data.customFiltersQuery = "";
        this.awaitHelper = AwaitHelper.getInstance();
    }

    AccountFilterView.inherits(BaseView, {});

    AccountFilterView.prototype.show = function () {
        this.configureEvents();
        this.presenter.show(this, this.model);
    };

    AccountFilterView.prototype.configureEvents = function () {
        var self = this;

        self.fn.onLoaded = function () {
            self.event.onShowAvailableOwners();
            self.event.onShowAvailableEnvironments();
            self.event.onShowAvailableAccountTypes();
            self.event.onShowAvailableViews();
            self.event.onLoadingAvailableFilters(self.data.customFiltersQuery);
        };

        self.fn.onSelectedViewChanged = function () {
            self.data.availableViews.forEach(function (view) {
                if (view.name !== self.data.selectedView) {
                    view.selected = false;
                    return;
                }
                view.selected = true;
                self.event.onToggleViewFilter(view);
            });

            if (self.data.selectedView == 'null') {
                self.event.onToggleViewFilter(null);
            }
        };

        self.fn.updateAvailableFilters = function () {
            var deselectedFields = self.data.availableFields.filter(function (r) {
                return !r.selected;
            }).map(function (r) {
                return r.data;
            });
            self.event.onFieldsDeselected(deselectedFields);
        };

        self.fn.onShowAvailableOwners = function () {
            self.awaitHelper.await(self.loadAvailableOwners.bind(self), 500);
        };
        self.$scope.$watch('$destroy', self.dispose.bind(self));
    };

    AccountFilterView.prototype.onAvailableFiltersLoaded = function(availableFilters){
        var self = this;
        self.data.availableFields = availableFilters;
    };

    AccountFilterView.prototype.loadAvailableOwners = function () {
        var self = this;

        self.event.onShowAvailableOwners(self.data.ownerFilter);
    };

    AccountFilterView.prototype.setAvailableOwners = function (owners) {
        this.data.availableOwners = owners;
    };

    AccountFilterView.prototype.setAvailableViews = function (views) {
        this.data.availableViews = views;
    };

    AccountFilterView.prototype.setAvailableAccountTypes = function (accounttype) {
        this.data.availableAccountType = accounttype;
    };

    AccountFilterView.prototype.setAvailableEnvironments = function (environments) {
        this.data.availableEnvironment = environments;
    };

    AccountFilterView.prototype.showCustomFilters = function (filters) {
        this.data.customFilters = filters;
    };

    AccountFilterView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    AccountFilterView.prototype.onTableFieldsLoaded = function (data) {
        var self = this;

        self.data.availableFields = data.map(function (record) {
            var copied = _.extend({
                selected: false
            }, record);
            return copied;
        }).filter(function (record) {
            return record.isFilterable;
        });
    };

    AccountFilterView.prototype.dispose = function () {

    };

    AccountFilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {

        var view = new AccountFilterView($scope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountFilterView;
});