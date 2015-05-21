/**
 * Created by trung.dang on 02/12/2015
 */
define([
    'shared/services/bus/FilterChannel',
    'shared/services/AccountEventBus'
], function (FilterChannel, AccountEventBus) {

    function AccountFilterPresenter(filterEventChannel, accountEventBus) {
        this.filterChannel = filterEventChannel;
        this.accountEventBus = accountEventBus;
    }

    AccountFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
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
    };

    AccountFilterPresenter.prototype.tableFieldsLoaded = function (data) {
        var self = this;
        self.view.onTableFieldsLoaded(data);
    };

    AccountFilterPresenter.newInstance = function ($filterChannel, accountEventBus) {
        var filterChannel = $filterChannel || FilterChannel.newInstance();
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return new AccountFilterPresenter(filterChannel, accountEventBus);
    };

    return AccountFilterPresenter;
});