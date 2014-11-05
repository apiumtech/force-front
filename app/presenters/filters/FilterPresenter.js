/**
 * Created by kevin on 11/5/14.
 */
app.registerPresenter(function (container) {
    var FilterChannel = container.getService('services/bus/FilterChannel');

    function FilterPresenter(filterEventChannel) {
        this.filterChannel = filterEventChannel;
    }

    FilterPresenter.prototype.show = function (view, model) {
        var channel = this.filterChannel;

        channel.listen(function (event) {
           if (event.remove) {

           }
        });
        view.event.onNameFilterChanged = function (currentValue) {
            model.setFilter({columnKey: "name"}, currentValue)
                .then(channel.send, view.showError.bind(view))
        };

        view.event.onFilterKeyUp = function (name, currentValue) {
            model.setFilter(name, currentValue)
                .then(channel.send, view.showError.bind(view))
        };

        view.event.onShowAvailableFilters = function () {
            model.getAvailableFilters()
                .then(view.showAvailableFilters.bind(view), view.showError.bind(view));
        };

        view.event.onAddFilter = function (column) {
            model.addFilter(column, undefined)
                .then(channel.send, view.showError.bind(view))
                .then(view.showFilters.bind(view), view.showError.bind(view));
        };

        view.event.onRemoveFilter = function (filter) {
            model.removeFilter(filter)
                .then(channel.send, view.showError.bind(view))
        };

        view.event.onToggleOwnerFilter = function (owner) {
            model.toggleOwnerFilter(owner)
                .then(channel.send, view.showError.bind(view))
        };
    };

    FilterPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));

        return Some(new FilterPresenter(filterChannel));
    };

    return FilterPresenter;
});