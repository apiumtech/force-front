/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'shared/services/bus/FilterChannel',
    'shared/services/AccountEventBus',
    'modules/account/filters/accountFilter/AccountFilterModel'
], function (FilterChannel, AccountEventBus, AccountFilterModel) {

    function AccountFilterPresenter(filterEventChannel, accountEventBus, model) {
        this.model = model || AccountFilterModel._diResolve();
        this.filterChannel = filterEventChannel || FilterChannel.newInstance();
        this.accountEventBus = accountEventBus || AccountEventBus.getInstance();
    }

    AccountFilterPresenter.prototype.show = function (view) {
        this.view = view;
        var model = this.model;

        view.event = view.event || {}

        var self = this;
        var channel = this.filterChannel;
        var eventBus = this.accountEventBus;

        eventBus.onTableFieldsLoaded(self.tableFieldsLoaded.bind(self));

        view.event.onShowAvailableViews = function () {
            model.getAvailableViews()
                .then(view.setAvailableViews.bind(view), view.showError.bind(view));
        };

        view.event.onToggleViewFilter = function (item) {
            channel.sendViewChangedSignal(item);
        };

        view.event.onFieldsDeselected = function (fieldNames) {
            eventBus.fireTableFieldsFilterDeselected(fieldNames);
        };

        view.event.onSearchQueryChanged = function (searchQuery) {
            channel.sendQueryingData(searchQuery);
        };

        view.event.onShowAvailableEnvironments = function (filter) {
            model.getAvailableEnvironments(filter)
                .then(view.setAvailableEnvironments.bind(view), view.showError.bind(view));
        };

        view.event.onToggleEnvironmentFilter = function (item) {
            channel.sendEnvironmentToggleSignal(item);
        };

        view.event.onShowAvailableAccountTypes = function (filter) {
            model.getAvailableAccountTypes(filter)
                .then(view.setAvailableAccountTypes.bind(view), view.showError.bind(view));
        };

        view.event.onToggleAccountTypeFilter = function (item) {
            channel.sendAccountTypeToggledSignal(item);
        };

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.setAvailableOwners.bind(view), view.showError.bind(view));
        };

        view.event.onToggleOwnerFilter = function (owner) {
            channel.sendOwnerToggleSignal(owner);
        };

        view.event.onLoadingAvailableFilters = function(filter){
            model.loadAvailableFilters(filter)
                .then(view.onAvailableFiltersLoaded.bind(view), view.showError.bind(view));
        }
    };

    AccountFilterPresenter.prototype.tableFieldsLoaded = function (data) {
        var self = this;
        self.view.onTableFieldsLoaded(data);
    };

    return AccountFilterPresenter;
});