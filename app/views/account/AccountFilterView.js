/**
 * Created by trung.dang on 02/12/2015
 */
app.registerView(function (container) {
    var _ = container.getFunction("underscore");
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');
    var BaseView = container.getView("views/BaseView");

    var AccountFilterPresenter = container.getPresenter('presenters/account/AccountFilterPresenter');
    var AccountFilterModel = container.getModel('models/account/AccountFilterModel');

    function AccountFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);

        this.data.selectedView = null;
        this.data.searchQuery = "";
        this.data.AccountTypeFilter = '';
        this.data.EnvFilter = '';
        this.data.ownerFilter = '';
        this.data.availableFields = [];
    }

    AccountFilterView.prototype = Object.create(BaseView.prototype, {});

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
        self.$scope.$watch('$destroy', self.dispose.bind(self));
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
        var scope = $scope || {};
        var model = $model || AccountFilterModel.newInstance().getOrElse(throwInstantiateException(AccountFilterModel));
        var presenter = $presenter || AccountFilterPresenter.newInstance().getOrElse(throwInstantiateException(AccountFilterPresenter));

        var view = new AccountFilterView(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountFilterView;
});