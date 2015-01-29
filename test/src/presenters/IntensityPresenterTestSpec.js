/**
 * Created by justin on 12/26/14.
 */
describe("IntensityPresenter", function () {
    var IntensityPresenter = app.getPresenter("presenters/IntensityPresenter"),
        sut, view, model;

    beforeEach(function () {
        view = {data: {}, event: {}, fn: {}};
        model = {};
        sut = IntensityPresenter.newInstance().getOrElse(throwInstantiateException(IntensityPresenter));
    });

    describe("show() ", function () {
        beforeEach(function () {
            sut.show(view, model);
        });

        [{
            viewEvent: "onLoaded", test: onLoadedTest
        }].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent;
                it("should define event." + viewEvent + " on View", function () {
                    expect(view.event[viewEvent]).not.toBeNull();
                    expect(isFunction(view.event[viewEvent])).toEqual(true);
                });

                describe("when view.event." + viewEvent + " is fired", testCase.test);
            });

        function onLoadedTest() {
            var viewEvent = "onLoaded",
                modelMethod = 'getWidgets', onSuccess = "onWidgetsLoaded", onError = "onWidgetsLoadFail";

            beforeEach(function () {
                model[modelMethod] = function () {
                };
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });

            it("presenter should connect event to '" + modelMethod + "' method on model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise())
                sut.show(view, model);
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on view if model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise())
                sut.show(view, model);
                view.event[viewEvent]();
                expect(view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on view if model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise())
                sut.show(view, model);
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }
    });
});