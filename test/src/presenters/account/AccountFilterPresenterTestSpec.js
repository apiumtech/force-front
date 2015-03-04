/**
 * Created by justin on 3/4/15
 */
describe("AccountFilterPresenter", function () {
    var AccountFilterPresenter = app.getPresenter('presenters/account/AccountFilterPresenter');

    var sut;
    var ___view, ___model;
    beforeEach(function () {
        ___view = {
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
            viewEvent: "onToggleOwnerFilter", exercise: onToggleOwnerFilterTest
        }].forEach(function (test) {
                var viewEvent = test.viewEvent;

                it("should declared '" + viewEvent + "' event for View", function () {
                    sut.show(___view, ___model);
                    testDeclareMethod(___view.event, viewEvent);
                });

                describe("when event '" + viewEvent + "' fired", function () {
                    beforeEach(function () {
                        sut.show(___view, ___model);
                    });
                    test.exercise();
                });
            });

        function onShowAvailableOwnersTest() {
            var modelMethod = "getAvailableOwners";
            var onSuccess = "showAvailableOwners";
            var onError = "showError";
            exerciseAjaxCallBinding("onShowAvailableOwners", modelMethod, onSuccess, onError);
        }

        function onToggleOwnerFilterTest() {
            it("should send owner toggle signal using channel", function () {
                spyOn(sut.filterChannel, 'sendOwnerToggleSignal');
                ___view.event.onToggleOwnerFilter({id: 1});
                expect(sut.filterChannel.sendOwnerToggleSignal).toHaveBeenCalledWith({id: 1});
            });

        }
    });


    function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
        beforeEach(function () {
            ___model[modelMethod] = function () {
            };
            ___view[onSuccess] = jasmine.createSpy();
            ___view[onError] = jasmine.createSpy();
        });
        it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakePromise());
            ___view.event[viewEvent]();
            expect(___model[modelMethod]).toHaveBeenCalled();
        });

        it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeOkPromise());
            ___view.event[viewEvent]();
            expect(___view[onSuccess]).toHaveBeenCalled();
        });

        it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
            spyOn(___model, modelMethod).and.returnValue(exerciseFakeKoPromise());
            ___view.event[viewEvent]();
            expect(___view[onError]).toHaveBeenCalled();
        });
    }
});