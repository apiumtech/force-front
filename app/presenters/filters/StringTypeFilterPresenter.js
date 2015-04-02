/**
 * Created by Justin on 4/2/2015.
 */
app.registerPresenter(function (container) {
    var AccountEventBus = container.getService('services/AccountEventBus');

    function StringTypeFilterPresenter(accountEventBus) {
        this.accountEventBus = accountEventBus;
    }

    StringTypeFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
        var self = this;
        var eventBus = self.accountEventBus;

        eventBus.onFilterValueChanged();
        view.event.searchValueChanged = function (filterValue) {

        };
        view.event.filterSelectionToggled = function (value) {

        };
    };

    StringTypeFilterPresenter.newInstance = function (accountEventBus) {
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return Some(new StringTypeFilterPresenter(accountEventBus));
    };

    return StringTypeFilterPresenter;
});