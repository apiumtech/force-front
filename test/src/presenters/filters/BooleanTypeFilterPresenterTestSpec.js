/**
 * Created by Justin on 4/6/2015.
 */
describe("BooleanTypeFilterPresenter", function () {
    var BooleanTypeFilterPresenter = app.getPresenter('presenters/filters/BooleanTypeFilterPresenter');
    var AccountEventBus = app.getService('services/AccountEventBus');
    var BooleanTypeFilterView = app.getView('views/filters/BooleanTypeFilterView');

    var accountEventBus, sut, view, model;

    beforeEach(function () {
        accountEventBus = jasmineMock(AccountEventBus, 'AccountEventBus');
        view = jasmineMock(BooleanTypeFilterView, 'BooleanTypeFilterView');
        model = {};
        sut = BooleanTypeFilterPresenter.newInstance(accountEventBus).getOrElse(throwInstantiateException(BooleanTypeFilterPresenter));
    });

    describe("show()", function () {
        beforeEach(function () {
            view.event = {};
            sut.show(view, model);
        });

        describe("filterSelectionToggled", function () {
            it("should fire event fireFilterValueChanged from the eventBus", function () {
                var key = 'key';
                var value = ['value1', 'value2', 'value3'];
                view.event.filterSelectionToggled(key, value);
                expect(accountEventBus.fireFilterValueChanged).toHaveBeenCalledWith(key, value);
            });
        });
    });
});