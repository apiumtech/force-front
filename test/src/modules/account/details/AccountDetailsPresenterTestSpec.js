/**
 * Created by justin on 3/9/15.
 */

define([
    'modules/account/details/AccountDetailsPresenter',
    'modules/account/details/AccountDetailsView',
    'modules/account/details/AccountDetailsModel'
], function (AccountDetailsPresenter, AccountDetailsView, AccountDetailsModel) {
    'use strict';

    describe("AccountDetailsPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            view = mock(AccountDetailsView);
            model = mock(AccountDetailsModel);
            sut = new AccountDetailsPresenter(model);
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
                },
                {
                    viewEvent: "onDeleteAccount", test: onDeleteAccountTest
                },
                {
                    viewEvent: "onSaveRelatedCompany", test: onSaveRelatedCompanyTest
                },
                {
                    viewEvent: "onLoadingRelatedContact", test: onLoadingRelatedContactTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view);
                        });
                        test();
                    });
                });

            function onLoadingRelatedContactTest() {
                var modelMethod = "loadRelatedContact";
                var onSuccess = "onRelatedContactLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onLoadingRelatedContact", modelMethod, onSuccess, onError);
            }

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

            function onDeleteAccountTest() {
                var accountId = 123;
                var spySuccess;

                function exerciseTest() {
                    spySuccess = sinon.stub();
                    view.event.onDeleteAccount(accountId, spySuccess);
                }
                it("should call method deleteAccount from model with correct params", function () {
                    model.deleteAccount.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(model.deleteAccount).toHaveBeenCalledWith(accountId);
                });
                it("should call success callback method upon success on model", function () {
                    model.deleteAccount.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(spySuccess).toHaveBeenCalled();
                });
                it("should call showError callback method upon failed on model", function () {
                    model.deleteAccount.returns(exerciseFakeKoPromise());
                    exerciseTest();
                    expect(view.showError).toHaveBeenCalled();
                });
            }

            function onSaveRelatedCompanyTest(){
                var accountId = 123;
                var relatedCompany = {
                    name: "name",
                    type: "type"
                };
                var spySuccess;

                function exerciseTest() {
                    spySuccess = sinon.stub();
                    view.event.onSaveRelatedCompany(accountId, relatedCompany, spySuccess);
                }
                it("should call method saveRelatedCompany from model with correct params", function () {
                    model.saveRelatedCompany.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(model.saveRelatedCompany).toHaveBeenCalledWith(accountId, relatedCompany);
                });
                it("should call success callback method upon success on model", function () {
                    model.saveRelatedCompany.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(spySuccess).toHaveBeenCalled();
                });
                it("should call showError callback method upon failed on model", function () {
                    model.saveRelatedCompany.returns(exerciseFakeKoPromise());
                    exerciseTest();
                    expect(view.showError).toHaveBeenCalled();
                });
            }


            function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
                beforeEach(function () {
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

});