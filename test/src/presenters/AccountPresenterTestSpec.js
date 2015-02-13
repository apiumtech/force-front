/**
 * Created by kevin on 11/6/14.
 */
describe("AccountPresenter", function () {
    var AccountPresenter = app.getPresenter('presenters/account/AccountPresenter');

    function exerciseCreatePresenter() {
        return AccountPresenter.newInstance(exerciseFakeChannel()).getOrElse("Could not create AccountPresenter");
    }

    [
        { viewEvent: 'onInit', modelMethod: 'getAccounts', onSuccess: 'showTableData', onError: 'showError' },
        { viewEvent: 'onNameFilterChanged', modelMethod: 'setNameFilter', onSuccess: 'showTableData', onError: 'showError' },
        { viewEvent: 'onSort', modelMethod: 'sortByField', onSuccess: 'showTableData', onError: 'showError' },
        { viewEvent: 'onToggleColumn', modelMethod: 'toggleField', onSuccess: 'showTableData', onError: 'showError' },
        { viewEvent: 'onShowAvailableColumns', modelMethod: 'getAllFields', onSuccess: 'showColumnList', onError: 'showError' },
        { viewEvent: 'onAccountsNextPage', modelMethod: 'nextPage', onSuccess: 'addTableData', onError: 'showError' }
    ].forEach(function (e) {
            it('should call the model method ' + e.modelMethod + ' on ' + e.viewEvent, function () {
                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                spyOn(model, e.modelMethod).and.returnValue(exerciseFakePromise());

                emitEvent(presenter, view, model);

                expect(model[e.modelMethod]).toHaveBeenCalled();
            });

            it('should call ' + e.onSuccess + ' when ' + e.modelMethod + ' finished OK', function () {
                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                view[e.onSuccess] = jasmine.createSpy();
                spyOn(model, e.modelMethod).and.returnValue(exerciseFakeOkPromise());

                emitEvent(presenter, view, model);

                expect(view[e.onSuccess]).toHaveBeenCalled();
            });

            it('should call ' + e.onError + ' when ' + e.modelMethod + ' failed', function () {
                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                view[e.onError] = jasmine.createSpy();
                spyOn(model, e.modelMethod).and.returnValue(exerciseFakeKoPromise());

                emitEvent(presenter, view, model);

                expect(view[e.onError]).toHaveBeenCalled();
            });

            function exerciseCreateView() {
                var view = { data: {}, event: {} };
                view.event[e.viewEvent] = function () {};
                view[e.onSuccess] = function () {};
                view[e.onError] = function () {};

                return view;
            }

            function exerciseCreateModel() {
                var model = {};
                model[e.modelMethod] = function () {};

                return model;
            }

            function emitEvent(presenter, view, model) {
                presenter.show(view, model);
                view.event[e.viewEvent]();
            }
        });
});