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

        channel.listen(function (event) {
            if (event.remove) {
                model.removeFilter(event.remove)
                    .then(view.showFilters.bind(view), view.showError.bind(view));
            }
        });

        view.event.onFilterKeyUp = function (name, currentValue) {
            model.addFilter(name, currentValue)
                .then(channel.send, view.showError.bind(view));
        };

        view.event.onShowAvailableViews= function (filter) {
            model.getAvailableViews(filter)
                .then(view.showAvailableViews.bind(view), view.showError.bind(view));
        };

        view.event.onToggleViewsFilter = function (item) {
            model.toggleViewsFilter(item)
                .then(function(){
                    channel.send;
                    alert("Environment updated");
                }, view.showError.bind(view));
        };

        view.event.onShowAvailableEnvironment = function (filter) {
            model.getAvailableEnvironment(filter)
                .then(view.showAvailableEnvironment.bind(view), view.showError.bind(view));
        };

        view.event.onToggleEnvironmentFilter = function (item) {
            model.toggleEnvironmentFilter(item)
                .then(function(){
                    channel.send;
                    alert("Environment updated");
                }, view.showError.bind(view));
        };

        view.event.onShowAvailableAccountType = function (filter) {
            model.getAvailableAccountType(filter)
                .then(view.showAvailableAccountType.bind(view), view.showError.bind(view));
        };

        view.event.onToggleAccountTypeFilter = function (item) {
            model.toggleAccountTypeFilter(item)
                .then(channel.send, view.showError.bind(view));
        };

        view.event.onShowAvailableFilters = function (nameFilter) {
            model.getAvailableFilters(nameFilter)
                .then(view.showAvailableFilters.bind(view), view.showError.bind(view));
        };

        view.event.onToggleFilter = function (owner) {
            model.toggleFilter(owner)
                .then(channel.send, view.showError.bind(view));
        };

        view.event.onAddFilter = function (column) {
            model.addFilter(column, undefined)
                .then(view.showFilters.bind(view), view.showError.bind(view));
        };

        view.event.onRemoveFilter = function (filter) {
            model.removeFilter(filter)
                .then(channel.send, view.showError.bind(view))
                .then(view.showFilters.bind(view), view.showError.bind(view));
        };

        view.event.onToggleOwnerFilter = function (owner) {
            model.toggleOwnerFilter(owner)
                .then(channel.send, view.showError.bind(view));
        };

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.showAvailableOwners.bind(view), view.showError.bind(view));
        };
    };

    AccountFilterPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));

        return Some(new AccountFilterPresenter(filterChannel));
    };

    return AccountFilterPresenter;
});