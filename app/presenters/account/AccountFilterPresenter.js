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

        view.event.onFilterKeyUp = function (name, currentValue) {
        };

        view.event.onShowAvailableViews = function () {

        };

        view.event.onSearchQueryChanged = function (searchQuery) {
            channel.sendQueryingData(searchQuery);
        };

        view.event.onToggleViewsFilter = function (item) {
        };

        view.event.onShowAvailableEnvironment = function (filter) {
        };

        view.event.onToggleEnvironmentFilter = function (item) {
        };

        view.event.onShowAvailableAccountType = function (filter) {
        };

        view.event.onToggleAccountTypeFilter = function (item) {
        };


        view.event.onToggleOwnerFilter = function (owner) {
            channel.sendOwnerToggleSignal(owner);
        };

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.showAvailableOwners.bind(view), view.showError.bind(view));
        };
    };

    AccountFilterPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwInstantiateException(FilterChannel));

        return Some(new AccountFilterPresenter(filterChannel));
    };

    return AccountFilterPresenter;
});