describe("DistributionPresenter", function () {
    var DistributionPresenter = app.getPresenter("presenters/DistributionPresenter"),
        sut, view, model;

    beforeEach(function () {
        view = {data: {}, event: {}, fn: {}};
        model = {};
        sut = DistributionPresenter.newInstance().getOrElse(throwInstantiateException(DistributionPresenter));
    });

    describe("show() ", function () {
        beforeEach(function () {
            sut.show(view, model);
        });

        [{
            viewEvent: "onLoaded", test: onLoadedTest
        }, {
            viewEvent: "onWidgetDropped", test: onWidgetDroppedTest
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
                modelMethod = 'getWidgets',
                onSuccess = "onWidgetsLoaded",
                onError = "onWidgetsLoadFail";
            exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
        }

        function onWidgetDroppedTest() {
            it("should call updateWidgetSize() on view", function () {
                view.updateWidgetSize = jasmine.createSpy();
                var element = {fake: "yes it fake"}, widget = {data: null};
                view.event.onWidgetDropped(element, widget);
                expect(view.updateWidgetSize).toHaveBeenCalledWith(element, widget);
            });
        }

        function exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent) {
            beforeEach(function () {
                model[modelMethod] = function () {
                };
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });

            it("presenter should connect event to '" + modelMethod + "' method on model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                sut.show(view, model);
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on view if model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                view.event[viewEvent]();
                expect(view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on view if model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                sut.show(view, model);
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }
    });
});