/**
 * Created by justin on 3/4/15
 */
describe("AccountFilterPresenter", function () {
    var AccountFilterPresenter = app.getPresenter('presenters/account/AccountFilterPresenter');

    var sut;
    var ___view, ___model;
    beforeEach(function () {
        view = {
            event: {}
        };
        ___model = {};
    });


    beforeEach(function () {
        sut = AccountFilterPresenter.newInstance().getOrElse(throwInstantiateException(AccountFilterPresenter));
    });

    describe("show", function () {
        [{
            viewEvent: "onShowAvailableOwners", exercise: onShowAvailableOwnersTest
        }, {
            viewEvent: "onShowAvailableViews", exercise: onShowAvailableViewsTest
        }, {
            viewEvent: "onShowAvailableEnvironments", exercise: onShowAvailableEnvironmentsTest
        }, {
            viewEvent: "onShowAvailableAccountTypes", exercise: onShowAvailableAccountTypesTest
        }, {
            viewEvent: "onToggleOwnerFilter", exercise: onToggleOwnerFilterTest
        }, {
            viewEvent: "onToggleEnvironmentFilter", exercise: onToggleEnvironmentFilterTest
        }, {
            viewEvent: "onToggleAccountTypeFilter", exercise: onToggleAccountTypeFilterTest
        }, {
            viewEvent: "onToggleViewFilter", exercise: onToggleViewFilterTest
        }, {
            viewEvent: "onSearchQueryChanged", exercise: onSearchQueryChangedTest
        }].forEach(function (test) {
                var viewEvent = test.viewEvent;

                it("should declared '" + viewEvent + "' event for View", function () {
                    sut.show(view, ___model);
                    testDeclareMethod(view.event, viewEvent);
                });

                describe("when event '" + viewEvent + "' fired", function () {
                    beforeEach(function () {
                        sut.show(view, ___model);
                    });
                    test.exercise();
                });
            });

        function onShowAvailableOwnersTest() {
            var modelMethod = "getAvailableOwners";
            var onSuccess = "setAvailableOwners";
            var onError = "showError";
            exerciseAjaxCallBinding("onShowAvailableOwners", modelMethod, onSuccess, onError);
        }

        function onShowAvailableViewsTest() {
            var modelMethod = "getAvailableViews";
            var onSuccess = "setAvailableViews";
            var onError = "showError";
            exerciseAjaxCallBinding("onShowAvailableViews", modelMethod, onSuccess, onError);
        }

        function onShowAvailableEnvironmentsTest() {
            var modelMethod = "getAvailableEnvironments";
            var onSuccess = "setAvailableEnvironments";
            var onError = "showError";
            exerciseAjaxCallBinding("onShowAvailableEnvironments", modelMethod, onSuccess, onError);
        }

        function onShowAvailableAccountTypesTest() {
            var modelMethod = "getAvailableAccountTypes";
            var onSuccess = "setAvailableAccountTypes";
            var onError = "showError";
            exerciseAjaxCallBinding("onShowAvailableAccountTypes", modelMethod, onSuccess, onError);
        }

        function onToggleOwnerFilterTest() {
            it("should send owner toggle signal using channel", function () {
                spyOn(sut.filterChannel, 'sendOwnerToggleSignal');
                view.event.onToggleOwnerFilter({id: 1});
                expect(sut.filterChannel.sendOwnerToggleSignal).toHaveBeenCalledWith({id: 1});
            });
        }

        function onToggleEnvironmentFilterTest() {
            it("should send environment toggle signal using channel", function () {
                spyOn(sut.filterChannel, 'sendEnvironmentToggleSignal');
                view.event.onToggleEnvironmentFilter({id: 1});
                expect(sut.filterChannel.sendEnvironmentToggleSignal).toHaveBeenCalledWith({id: 1});
            });
        }

        function onToggleAccountTypeFilterTest() {
            it("should send account type toggle signal using channel", function () {
                spyOn(sut.filterChannel, 'sendAccountTypeToggledSignal');
                view.event.onToggleAccountTypeFilter({id: 1});
                expect(sut.filterChannel.sendAccountTypeToggledSignal).toHaveBeenCalledWith({id: 1});
            });
        }

        function onToggleViewFilterTest() {
            it("should send view toggle signal using channel", function () {
                spyOn(sut.filterChannel, 'sendViewChangedSignal');
                view.event.onToggleViewFilter({id: 1});
                expect(sut.filterChannel.sendViewChangedSignal).toHaveBeenCalledWith({id: 1});
            });
        }

        function onSearchQueryChangedTest() {
            it("should send query changed signal using channel", function () {
                spyOn(sut.filterChannel, 'sendQueryingData');
                view.event.onSearchQueryChanged("queryString_apiumtech");
                expect(sut.filterChannel.sendQueryingData).toHaveBeenCalledWith("queryString_apiumtech");
            });
        }
    });


    function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
        beforeEach(function () {
            ___model[modelMethod] = function () {
            };
            view[onSuccess] = jasmine.createSpy();
            view[onError] = jasmine.createSpy();
        });
        it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakePromise());
            view.event[viewEvent]();
            expect(___model[modelMethod]).toHaveBeenCalled();
        });

        it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeOkPromise());
            view.event[viewEvent]();
            expect(view[onSuccess]).toHaveBeenCalled();
        });

        it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeKoPromise());
            view.event[viewEvent]();
            expect(view[onError]).toHaveBeenCalled();
        });
    }
});