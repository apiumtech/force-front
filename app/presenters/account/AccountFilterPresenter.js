/**
 * Created by trung.dang on 02/12/2015
 */
app.registerPresenter(function (container) {
    var FilterChannel = container.getService('services/bus/FilterChannel');

    function AccountFilterPresenter(filterEventChannel) {
        this.filterChannel = filterEventChannel;
    }

    AccountFilterPresenter.prototype.show = function (view, model) {
        var channel = this.filterChannel;
        this.view = view;
        this.model = model;
        var self = this;

        view.event.onShowAvailableViews = function () {
            model.getAvailableViews()
                .then(view.showAvailableViews.bind(view), view.showError.bind(view));
        };

        view.event.onToggleViewFilter = function (item) {
            channel.sendViewChangedSignal(item);
        };

        view.event.onSearchQueryChanged = function (searchQuery) {
            channel.sendQueryingData(searchQuery);
        };

        view.event.onShowAvailableEnvironments = function (filter) {
            model.getAvailableEnvironments(filter)
                .then(view.showAvailableEnvironments.bind(view), view.showError.bind(view));
        };

        view.event.onToggleEnvironmentFilter = function (item) {
            channel.sendEnvironmentToggleSignal(item);
        };

        view.event.onShowAvailableAccountTypes = function (filter) {
            model.getAvailableAccountTypes(filter)
                .then(view.showAvailableAccountTypes.bind(view), view.showError.bind(view));
        };

        view.event.onToggleAccountTypeFilter = function (item) {
            channel.sendAccountTypeToggledSignal(item);
        };

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.showAvailableOwners.bind(view), view.showError.bind(view));
        };

        view.event.onToggleOwnerFilter = function (owner) {
            channel.sendOwnerToggleSignal(owner);
        };
    };

    AccountFilterPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwInstantiateException(FilterChannel));

        return Some(new AccountFilterPresenter(filterChannel));
    };

    return AccountFilterPresenter;
});