/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailsPresenter", function () {
    var AccountDetailsPresenter = app.getPresenter('presenters/accountDetails/AccountDetailsPresenter');
    var sut, view, model;

    beforeEach(function () {
        sut = AccountDetailsPresenter.newInstance().getOrElse(throwInstantiateException(AccountDetailsPresenter));
        view = {event: {}};
        model = {};
    });

    describe("show()", function () {
        [
            {
                viewEvent: "onLoadAccount", test: onLoadAccountTest
            },
            {
                viewEvent: "onToggleFollow", test: onToggleFollowTest
            },
            {
                viewEvent: "onUpdateEmail", test: onUpdateEmailTest
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    test = testCase.test;

                describe("when event '" + viewEvent + "' fired", function () {
                    beforeEach(function () {
                        sut.show(view, model);
                    });
                    test();
                });
            });

        function onLoadAccountTest() {
            var modelMethod = "getAccountDetail";
            var onSuccess = "onAccountLoaded";
            var onError = "showError";
            exerciseAjaxCallBinding("onLoadAccount", modelMethod, onSuccess, onError);
        }

        function onToggleFollowTest() {
            var modelMethod = "toggleFollow";
            var onSuccess = "onFollowToggled";
            var onError = "showError";
            exerciseAjaxCallBinding("onToggleFollow", modelMethod, onSuccess, onError);
        }

        function onUpdateEmailTest() {
            var modelMethod = "updateAccountData";
            var onSuccess = "onAccountUpdated";
            var onError = "showError";
            exerciseAjaxCallBinding("onUpdateEmail", modelMethod, onSuccess, onError);
        }


        function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
            beforeEach(function () {
                model[modelMethod] = function () {
                };
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });
            it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                view.event[viewEvent]();
                expect(view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }
    });
});