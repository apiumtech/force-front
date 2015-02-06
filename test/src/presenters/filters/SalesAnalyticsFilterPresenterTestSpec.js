/**
 * Created by Justin on 2/5/2015.
 */
describe("SalesAnalyticsFilterPresenter", function () {
    var SalesAnalyticsFilterPresenter = app.getPresenter('presenters/filters/SalesAnalyticsFilterPresenter');
    var sut;

    beforeEach(function () {
        sut = SalesAnalyticsFilterPresenter.newInstance().getOrElse(throwInstantiateException(SalesAnalyticsFilterPresenter));
    });

    var ___view, ___model;
    describe("show()", function () {
        describe("should connect view's events to model", function () {

            beforeEach(function () {
                ___view = {
                    event: {}
                };
                ___model = {};
                sut.show(___view, ___model);
            });

            [{
                viewEvent: "onFilterInitializing", test: onFilterInitializingTest
            }, {
                viewEvent: "onFilterByGroup", test: onFilterByGroupTest
            }].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    it("should declared '" + viewEvent + "' event for View", function () {
                        testDeclareMethod(___view.event, viewEvent);
                    });

                    describe("when event '" + viewEvent + "' fired", test);
                });

            function onFilterInitializingTest() {
                var viewEvent = "onFilterInitializing",
                    modelMethod = 'getUsers',
                    onSuccess = "onUsersLoadedSuccess",
                    onError = "onUsersLoadedFail";
                exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
            }

            function onFilterByGroupTest() {
                var groupName = "team";
                function exerciseTest() {
                    ___model.addQuery = jasmine.createSpy();
                    ___view.event.onFilterInitializing = jasmine.createSpy();
                    ___view.event.onFilterByGroup(groupName);
                }

                it("should call model's addQuery", function () {
                    exerciseTest();
                    expect(___model.addQuery).toHaveBeenCalledWith('group', groupName);
                });

                it("should fire event onFilterInitializing", function () {
                    exerciseTest();
                    expect(___view.event.onFilterInitializing).toHaveBeenCalled();
                });
            }
        });
    });


    function exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent) {
        beforeEach(function () {
            ___model[modelMethod] = function () {
            };
            ___view[onSuccess] = jasmine.createSpy();
            ___view[onError] = jasmine.createSpy();
        });

        it("presenter should connect event to '" + modelMethod + "' method on model", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakePromise());
            ___view.event[viewEvent]();
            expect(___model[modelMethod]).toHaveBeenCalled();
        });

        it("should call method '" + onSuccess + "' on view if model '" + modelMethod + "' return success", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeOkPromise());
            ___view.event[viewEvent]();
            expect(___view[onSuccess]).toHaveBeenCalled();
        });

        it("should call method '" + onError + "' on view if model '" + modelMethod + "' return error", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeKoPromise());
            ___view.event[viewEvent]();
            expect(___view[onError]).toHaveBeenCalled();
        });
    }
});