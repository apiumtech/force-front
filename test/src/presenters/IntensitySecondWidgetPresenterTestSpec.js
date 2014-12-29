/**
 * Created by justin on 12/22/14.
 */
describe("TableWidgetPresenter", function () {
    var TableWidgetPresenter = app.getPresenter('presenters/TableWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = TableWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate TableWidgetPresenter"));
    });

    describe("show() method", function () {
        var model;
        var view;

        [{
            event: "onReloadWidgetStart",
            modelMethod: "reloadWidget",
            onError: "onReloadWidgetError",
            onSuccess: "onReloadWidgetSuccess"
        }].forEach(function (item) {
                describe("When view's '" + item.event + "' event fired ", function () {
                    var model = createModel();
                    var view = createView();

                    it("should call '" + item.modelMethod + "' on model", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakePromise());
                        sut.show(view, model);
                        view.event[item.event]();
                        expect(model[item.modelMethod]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onSuccess + "' when model returns success", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeOkPromise());
                        sut.show(view, model);
                        view.event[item.event]();
                        expect(view[item.onSuccess]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onError + "' when model returns fail", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeKoPromise());
                        sut.show(view, model);
                        view.event[item.event]();
                        expect(view[item.onError]).toHaveBeenCalled();
                    });
                });

                function createModel() {
                    var model = {};
                    model[item.modelMethod] = function () {
                    };
                    return model;
                }

                function createView() {
                    var v = {event: {}};
                    v[item.onSuccess] = jasmine.createSpy();
                    v[item.onError] = jasmine.createSpy();
                    v.event[item.event] = function () {
                    };
                    return v;
                }
            });
    });
})
;