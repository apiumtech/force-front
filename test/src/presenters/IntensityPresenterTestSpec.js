/**
 * Created by justin on 12/26/14.
 */
describe("IntensityPresenter", function () {
    var IntensityPresenter = app.getPresenter("presenters/IntensityPresenter");


    describe("show() ", function () {
        [
            {
                viewEvent: "onLoaded",
                modelMethod: "getWidgets",
                onSuccess: "onWidgetsLoaded",
                onError: "onWidgetsLoadFail"
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    modelMethod = testCase.modelMethod,
                    onSuccess = testCase.onSuccess,
                    onError = testCase.onError;

                function createView() {
                    var view = {};
                    view[onSuccess] = jasmine.createSpy();
                    view[onError] = jasmine.createSpy();
                    view.event = {};

                    return view;
                }

                function createModel() {
                    var model = {};
                    model[modelMethod] = function () {
                    };
                    return model;
                }

                describe("When '" + viewEvent + "' on view fired", function () {
                    var model, view, sut;
                    beforeEach(function () {
                        model = createModel();
                        view = createView();
                        sut = new IntensityPresenter();
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
                });
            });
    });
});