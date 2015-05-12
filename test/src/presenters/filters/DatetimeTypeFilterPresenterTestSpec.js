/**
 * Created by Justin on 4/6/2015.
 */
describe("DatetimeTypeFilterPresenter", function () {
    var DatetimeTypeFilterPresenter = app.getPresenter('presenters/filters/DatetimeTypeFilterPresenter');
    var AccountEventBus = app.getService('services/AccountEventBus');
    var DatetimeTypeFilterView = app.getView('views/filters/DatetimeTypeFilterView');

    var accountEventBus, sut, view, model;

    beforeEach(function () {
        accountEventBus = jasmineMock(AccountEventBus, 'AccountEventBus');
        view = jasmineMock(DatetimeTypeFilterView, 'DatetimeTypeFilterView');
        model = {};
        sut = DatetimeTypeFilterPresenter.newInstance(accountEventBus);
    });

    describe("show()", function () {
        beforeEach(function () {
            view.event = {};
            sut.show(view, model);
        });

        describe("filterSelectionToggled", function () {
            it("should fire event fireFilterValueChanged from the eventBus", function () {
                var key = 'key';
                var value = [{from: new Date(2015, 3, 1), to: new Date(2015, 3, 5)}];
                view.event.filterSelectionToggled(key, value);
                expect(accountEventBus.fireFilterValueChanged).toHaveBeenCalledWith(key, value);
            });
        });
    });
});