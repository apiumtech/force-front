/**
 * Created by justin on 12/22/14.
 */
describe("GraphWidgetPresenter", function () {
    var GraphWidgetPresenter = app.getPresenter('presenters/GraphWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = GraphWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate GraphWidgetPresenter"));
    });

    describe("Connect view to model", function () {
        //region test should declare methods
        var ___view, ___model;
        [
            {
                viewEvent: "onReloadWidgetStart", test: onReloadWidgetStartTest
            },
            {
                viewEvent: "onReloadWidgetDone", test: onReloadWidgetDoneTest
            },
            {
                viewEvent: "onFilterChanged", test: onFilterChangedTest
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    test = testCase.test;

                beforeEach(function () {
                    ___view = {
                        event: {}
                    };
                    ___model = {};
                    sut.show(___view, ___model);
                });

                it("should declared '" + viewEvent + "' event for View", function () {

                    expect(___view.event[viewEvent]).not.toBeNull();
                    expect(isFunction(___view.event[viewEvent])).toEqual(true);
                });

                describe("when event '" + viewEvent + "' fired", test);
            });

        function onReloadWidgetStartTest() {
            it("should call '_executeLoadWidget' method", function () {
                spyOn(sut, '_executeLoadWidget');
                ___view.event.onReloadWidgetStart();
                expect(sut._executeLoadWidget).toHaveBeenCalled();
            });
        }

        function onReloadWidgetDoneTest() {
            it("should call 'sendReloadCompleteSignal' on the channel", function () {
                spyOn(sut.widgetEventChannel, 'sendReloadCompleteSignal');
                var errMsg = {msg: "test message"};
                ___view.event.onReloadWidgetDone(errMsg);
                expect(sut.widgetEventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith(errMsg);
            });
        }

        function onFilterChangedTest() {

        }


        //endregion test should declare methods

        //region specific methods
        [{
            method: "_executeLoadWidget",
            modelMethod: "reloadWidget",
            onError: "onReloadWidgetError",
            onSuccess: "onReloadWidgetSuccess"
        }, {
            method: "_executeLoadWidget",
            modelMethod: "reloadWidget",
            onError: "onReloadWidgetError",
            onSuccess: "onReloadWidgetSuccess"
        }, {
            method: "_executeMoveWidget",
            modelMethod: "moveWidget",
            onError: "onMoveWidgetError",
            onSuccess: "onMoveWidgetSuccess"
        }].forEach(function (item) {
                describe("Calling '" + item.method + "' ", function () {
                    var model = createModel();
                    var view = createView();

                    it("should call '" + item.modelMethod + "' on model", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakePromise());
                        sut.show(view, model);
                        sut[item.method]();
                        expect(model[item.modelMethod]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onSuccess + "' when model returns success", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeOkPromise());
                        sut.show(view, model);
                        sut[item.method]();
                        expect(view[item.onSuccess]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onError + "' when model returns fail", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeKoPromise());
                        sut.show(view, model);
                        sut[item.method]();
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

        //endregion
    });
});