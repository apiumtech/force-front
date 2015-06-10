define([
    'modules/account/details/addCompanyDialog/AddCompanyDialogPresenter',
    'modules/account/details/addCompanyDialog/AddCompanyDialogView',
    'modules/account/details/addCompanyDialog/AddCompanyDialogModel'
], function(AddCompanyDialogPresenter, AddCompanyDialogView, AddCompanyDialogModel) {
    'use strict';

    describe('AddCompanyDialogPresenter Test', function() {
        var sut, model, view;

        beforeEach(function () {
            view = mock(AddCompanyDialogView);
            model = mock(AddCompanyDialogModel);
            sut = new AddCompanyDialogPresenter(model);
        });

        describe('show', function () {
            beforeEach(function () {
                sut.show(view);
            });

            describe('view.event.onGetCompanyTypes', function () {
                var spySuccess;
                function exerciseTest() {
                    spySuccess = sinon.stub();
                    view.event.onGetCompanyTypes(spySuccess);
                }
                it("should call method deleteAccount from model with correct params", function () {
                    model.getCompanyTypes.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(model.getCompanyTypes).toHaveBeenCalledWith();
                });
                it("should call success callback method upon success on model", function () {
                    model.getCompanyTypes.returns(exerciseFakeOkPromise());
                    exerciseTest();
                    expect(spySuccess).toHaveBeenCalled();
                });
                it("should call showError callback method upon failed on model", function () {
                    model.getCompanyTypes.returns(exerciseFakeKoPromise());
                    exerciseTest();
                    expect(view.showError).toHaveBeenCalled();
                });
            });

        });
    });
});