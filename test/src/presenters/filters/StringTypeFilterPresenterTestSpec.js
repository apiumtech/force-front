/**
 * Created by Justin on 4/6/2015.
 */
describe("StringTypeFilterPresenter", function () {
    var StringTypeFilterPresenter = app.getPresenter('presenters/filters/StringTypeFilterPresenter');
    var AccountEventBus = app.getService('services/AccountEventBus');
    var StringTypeFilterView = app.getView('views/filters/StringTypeFilterView');
    var StringTypeFilterModel = app.getModel('models/filters/StringTypeFilterModel');

    var accountEventBus, sut, view, model;

    beforeEach(function () {
        accountEventBus = jasmineMock(AccountEventBus, 'AccountEventBus');
        view = jasmineMock(StringTypeFilterView, 'StringTypeFilterView');
        model = jasmineMock(StringTypeFilterModel, 'StringTypeFilterModel');
        sut = StringTypeFilterPresenter.newInstance(accountEventBus);
    });

    describe("show()", function () {
        beforeEach(function () {
            view.event = {};
            sut.show(view, model);
        });

        describe("searchValueChanged", function () {
            it("should call getFilterValues from model", function () {
                model.getFilterValues = function () {
                };
                spyOn(model, 'getFilterValues').and.returnValue(exerciseFakeOkPromise());
                view.event.searchValueChanged('fieldA', 'valueA');
                expect(model.getFilterValues).toHaveBeenCalledWith('fieldA', 'valueA');
            });

            it("should call onFieldValuesLoaded from view upon success of model", function () {
                model.getFilterValues = function () {
                };
                spyOn(model, 'getFilterValues').and.returnValue(exerciseFakeOkPromise());
                view.event.searchValueChanged('fieldA', 'valueA');
                expect(view.onFieldValuesLoaded).toHaveBeenCalled();
            });

            it("should call showError from view upon failure of model", function () {
                model.getFilterValues = function () {
                };
                spyOn(model, 'getFilterValues').and.returnValue(exerciseFakeKoPromise());
                view.event.searchValueChanged('fieldA', 'valueA');
                expect(view.showError).toHaveBeenCalled();
            });
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