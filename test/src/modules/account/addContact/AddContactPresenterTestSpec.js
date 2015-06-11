define([
    'modules/account/addContact/AddContactPresenter',
    'modules/account/addContact/AddContactModel',
    'modules/account/addContact/AddContactView'
], function(AddContactPresenter, AddContactModel, AddContactView) {
    'use strict';

    describe('AddContactPresenter Test', function() {
        var sut, model, view;
        beforeEach(function(){
            model = mock(AddContactModel);
            view = mock(AddContactView);
            sut = new AddContactPresenter(model);
        });

        describe('show', function () {
            [
                {
                    viewEvent: "getAccountData", test: getAccountDataTest
                },
                {
                    viewEvent: "onSaveContact", test: onSaveContactTest
                }
            ].forEach(function(testCase){
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view);
                        });
                        test();
                    });

                });

            function getAccountDataTest(){
                var modelMethod = "getAccountData";
                var onSuccess = "onAccountDataLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("getAccountData", modelMethod, onSuccess, onError);
            };

            function onSaveContactTest(){
                var modelMethod = "saveContact";
                var onSuccess = "onContactSaved";
                var onError = "showError";
                exerciseAjaxCallBinding("onSaveContact", modelMethod, onSuccess, onError);
            };

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