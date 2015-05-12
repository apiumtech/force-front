/**
 * Created by Justin on 4/2/2015.
 */
app.registerPresenter(function (container) {
    var AccountEventBus = container.getService('services/AccountEventBus');

    function BooleanTypeFilterPresenter(accountEventBus) {
        this.accountEventBus = accountEventBus;
    }

    BooleanTypeFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
        var self = this;
        var eventBus = self.accountEventBus;

        view.event.filterSelectionToggled = function (key, values) {
            eventBus.fireFilterValueChanged(key, values);
        };
    };

    BooleanTypeFilterPresenter.newInstance = function (accountEventBus) {
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return new BooleanTypeFilterPresenter(accountEventBus);
    };

    return BooleanTypeFilterPresenter;
});