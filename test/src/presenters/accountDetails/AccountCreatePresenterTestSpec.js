/**
 * Created by justin on 3/9/15.
 */
describe("AccountCreatePresenter", function () {
    var AccountCreatePresenter = app.getPresenter('presenters/accountDetails/AccountCreatePresenter');
    var sut, view, model;

    beforeEach(function () {
        sut = AccountCreatePresenter.newInstance().getOrElse(throwInstantiateException(AccountCreatePresenter));
        view = {event: {}};
        model = {};
    });

    describe("show()", function () {
        [
            {
                viewEvent: "onUploadFile", test: onUploadFileTest
            },
            {
                viewEvent: "onCreateAccount", test: onCreateAccountTest
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

        function onUploadFileTest() {
            var modelMethod = "uploadFile";
            var onSuccess = "onUploadComplete";
            var onError = "showError";
            exerciseAjaxCallBinding("onUploadFile", modelMethod, onSuccess, onError);
        }

        function onCreateAccountTest() {
            var modelMethod = "createAccount";
            var onSuccess = "onAccountCreated";
            var onError = "showError";
            exerciseAjaxCallBinding("onCreateAccount", modelMethod, onSuccess, onError);
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