/**
 * Created by kevin on 11/6/14.
 */
describe("FilterPresenter", function () {
    var FilterPresenter = app.getPresenter('presenters/filters/FilterPresenter');

    function exerciseCreatePresenter() {
        return FilterPresenter.newInstance(exerciseFakeChannel()).getOrElse("Could not create FilterPresenter");
    }

    [
        { viewEvent: 'onFilterKeyUp', modelMethod: 'addFilter', onSuccess: '*', onError: 'showError' },
        { viewEvent: 'onShowAvailableFilters', modelMethod: 'getAvailableFilters', onSuccess: 'showAvailableFilters', onError: 'showError' },
        { viewEvent: 'onAddFilter', modelMethod: 'addFilter', onSuccess: 'showFilters', onError: 'showError' },
        { viewEvent: 'onRemoveFilter', modelMethod: 'removeFilter', onSuccess: 'showFilters', onError: 'showError' },
        { viewEvent: 'onToggleOwnerFilter', modelMethod: 'toggleOwnerFilter', onSuccess: '*', onError: 'showError' },
        { viewEvent: 'onShowAvailableOwners', modelMethod: 'getAvailableOwners', onSuccess: 'showAvailableOwners', onError: 'showError' }
    ].forEach(function (e) {
            it('should call the model method ' + e.modelMethod + ' on ' + e.viewEvent, function () {
                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                spyOn(model, e.modelMethod).and.returnValue(exerciseFakePromise());

                presenter.show(view, model);
                view.event[e.viewEvent]();

                expect(model[e.modelMethod]).toHaveBeenCalled();
            });

            it('should call ' + e.onSuccess + ' when ' + e.modelMethod + ' finished OK', function () {
                if (e.onSuccess == "*") {
                    return;
                }

                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                view[e.onSuccess] = jasmine.createSpy();
                spyOn(model, e.modelMethod).and.returnValue(exerciseFakeOkPromise());

                presenter.show(view, model);
                view.event[e.viewEvent]();

                expect(view[e.onSuccess]).toHaveBeenCalled();
            });

            it('should call ' + e.onError + ' when ' + e.modelMethod + ' failed', function () {
                if (e.onError == "*") {
                    return;
                }

                var presenter = exerciseCreatePresenter();
                var view = exerciseCreateView();
                var model = exerciseCreateModel();

                view[e.onError] = jasmine.createSpy();
                spyOn(model, e.modelMethod).and.returnValue(exerciseFakeKoPromise());

                presenter.show(view, model);
                view.event[e.viewEvent]();

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
        });
});