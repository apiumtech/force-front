/**
 * Created by Justin on 4/2/2015.
 */
define([
    'shared/services/AccountEventBus'
], function (AccountEventBus) {

    function StringTypeFilterPresenter(accountEventBus) {
        this.accountEventBus = accountEventBus;
    }

    StringTypeFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
        var self = this;
        var eventBus = self.accountEventBus;

        view.event.searchValueChanged = function (fieldName, queryValue) {
            console.log("field name", fieldName);
            model.getFilterValues(fieldName, queryValue)
                .then(view.onFieldValuesLoaded.bind(view), view.showError.bind(view));
        };

        view.event.filterSelectionToggled = function (key, values) {
            console.log(key);
            eventBus.fireFilterValueChanged(key, values);
        };
    };

    StringTypeFilterPresenter.newInstance = function (accountEventBus) {
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return new StringTypeFilterPresenter(accountEventBus);
    };

    return StringTypeFilterPresenter;
});