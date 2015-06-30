define([
    'modules/account/details/addCompanyDialog/AddCompanyDialogView',
    'modules/account/details/addCompanyDialog/AddCompanyDialogPresenter'
], function (AddCompanyDialogView, AddCompanyDialogPresenter) {
    'use strict';

    describe('AddCompanyDialogView Test', function () {
        var sut, scope, presenter, modalInstance;

        beforeEach(function () {
            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
            modalInstance = {
                dismiss: function () {
                }
            };
            sinon.stub(modalInstance, 'dismiss');
            presenter = mock(AddCompanyDialogPresenter);
            sut = new AddCompanyDialogView(scope, modalInstance, presenter);
            sut.event = {};
        });

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(AddCompanyDialogView.prototype, 'configureEvents');
            });
            afterEach(function () {
                AddCompanyDialogView.prototype.configureEvents.restore();
            });
            it("should call configureEvents", function () {
                new AddCompanyDialogView(scope, modalInstance, presenter);
                expect(AddCompanyDialogView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("show", function () {
            it("should call show on presenter", function () {
                sut.show();
                expect(presenter.show).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {

            beforeEach(function () {
                sut.configureEvents();
            });

            describe('fn.close', function () {
                it("should dismiss the parameter dialog", function () {
                    sut.fn.close();
                    expect(modalInstance.dismiss).toHaveBeenCalled();
                });
            });

            describe('fn.getCompanyTypes', function () {
                beforeEach(function () {
                    sut.event.onGetCompanyTypes = sinon.stub();
                    sinon.stub(sut, 'onGetCompanySuccess');
                    spyOn(sut.event, 'onGetCompanyTypes').and.callFake(function (callback) {
                        callback();
                    });
                    sut.fn.getCompanyTypes();
                });
                it("should fire onGetCompanyTypes event", function () {
                    expect(sut.event.onGetCompanyTypes).toHaveBeenCalledWith(jasmine.any(Function));
                });
                it("should call onGetCompanySuccess upon success of onGetCompanyTypes event", function () {
                    expect(sut.onGetCompanySuccess).toHaveBeenCalled();
                });

            });

        });


        describe('onGetCompanySuccess', function () {
            it("should assign returned data to companyTypes", function () {
                var data = [
                    {"1": "1"},
                    {"2": "2"},
                    {"3": "3"},
                ];

                sut.onGetCompanySuccess(data);
                expect(scope.companyTypes).toEqual([
                    {"1": "1"},
                    {"2": "2"},
                    {"3": "3"},
                ]);
            });
        });

    });
});