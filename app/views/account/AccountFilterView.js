/**
 * Created by trung.dang on 02/12/2015
 */
app.registerView(function (container) {
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');
    var BaseView = container.getView("views/BaseView");

    var AccountFilterPresenter = container.getPresenter('presenters/account/AccountFilterPresenter');
    var AccountFilterModel = container.getModel('models/account/AccountFilterModel');

    function AccountFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);

        this.data.showAvailableFilters = false;
        this.data.showAvailableOwners = false;
        this.data.showAvailableAccountType = false;
        this.data.showAvailableEnvironment = false;
        this.data.showAvailableViews = false;
        this.data.selectedView = null;
        this.data.searchQuery = "";
    }

    AccountFilterView.prototype = Object.create(BaseView.prototype, {});

    AccountFilterView.prototype.show = function () {
        this.configureEvents();
        this.presenter.show(this, this.model);
    };

    AccountFilterView.prototype.configureEvents = function () {
        var self = this;

        self.fn.onLoaded = function () {
            self.event.onShowAvailableEnvironment();
            self.event.onShowAvailableViews();
            self.event.onShowAvailableOwners();
        };

        self.fn.onSelectedViewChanged = function () {
            self.data.availableViews.forEach(function (view) {
                if (view.name !== self.data.selectedView) {
                    return;
                }
                self.event.onToggleViewsFilter(view);
            });
        };
    };

    AccountFilterView.prototype.showAvailableFilters = function (filters) {
        this.data.showAvailableFilters = true;
        this.data.availableFilters = filters;
    };

    AccountFilterView.prototype.showFilters = function (filters) {
        this.data.customFilters = filters;
        this.data.showAvailableFilters = true;
        this.data.availableFilters = [];
    };

    AccountFilterView.prototype.showAvailableOwners = function (owners) {
        this.data.showAvailableOwners = true;
        this.data.availableOwners = owners;
    };

    AccountFilterView.prototype.showAvailableViews = function (views) {
        this.data.showAvailableViews = true;
        this.data.availableViews = views;
    };

    AccountFilterView.prototype.showAvailableAccountType = function (accounttype) {
        this.data.showAvailableAccountType = true;
        this.data.availableAccountType = accounttype;
    };

    AccountFilterView.prototype.showAvailableEnvironment = function (envs) {
        this.data.showAvailableEnvironment = true;
        this.data.availableEnvironment = envs;
    };

    AccountFilterView.prototype.showCustomFilters = function (filters) {
        this.data.customFilters = filters;
    };

    AccountFilterView.prototype.showError = function (error) {
        this.data.currentError = error;
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