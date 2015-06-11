define([
    'shared/BaseView',
    'modules/account/addContact/AddContactView'
], function (BaseView, AddContactView) {
    'use strict';

    describe('AddContactView Test', function () {
        var sut;
        beforeEach(function () {
            sut = new AddContactView();
            sut.event = {};
            sut.fn = {};
        });
        describe("show", function () {
            beforeEach(function () {
                sinon.stub(BaseView.prototype, 'show');
                sinon.stub(AddContactView.prototype, 'configureEvents');
            });
            afterEach(function () {
                BaseView.prototype.show.restore();
                AddContactView.prototype.configureEvents.restore();
            });

            beforeEach(function () {
                sut.show();
            });
            it("should call BaseView show method", function () {
                expect(BaseView.prototype.show).toHaveBeenCalled();
            });
            it("should call configureEvents method", function () {
                expect(AddContactView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });


            describe('fn.pageInitialized', function () {
                beforeEach(function () {
                    sut.accountId = 123;
                    sut.event.getAccountData = sinon.stub();
                    sut.fn.pageInitialized();
                });
                it("should fire getAccountData event", function () {
                    expect(sut.event.getAccountData).toHaveBeenCalledWith(123);
                });
            });

            describe('fn.saveContact', function () {
                beforeEach(function () {
                    sut.contactData = {
                        "this": "is the contact data"
                    };
                    sut.event.onSaveContact = sinon.stub();
                    sut.fn.saveContact();
                });

                it("should fire onSaveContact event", function () {
                    expect(sut.event.onSaveContact).toHaveBeenCalledWith({
                        "this": "is the contact data"
                    });
                });

            });

        });

        describe('onAccountDataLoaded', function () {
            beforeEach(function () {
                var data = {
                    "account": "data"
                };
                sut.accountData = undefined;
                sut.fn.startNewForm = sinon.stub();
                sut.onAccountDataLoaded(data);
            });

            it("should initialize a new form by calling fn.startNewForm", function () {
                expect(sut.fn.startNewForm).toHaveBeenCalled();
            });

            it("should assign the returned data to accountData", function () {
                expect(sut.accountData).toEqual({
                    "account": "data"
                });
            });

        });

        describe('onContactSaved', function () {
            describe('continueAfterSaved is true', function () {
                it("should restart the current form by calling fn.startNewForm", function () {
                    var response = {};
                    sut.continueAfterSaved = true;
                    sut.fn.startNewForm = sinon.stub();
                    sut.onContactSaved(response);
                    expect(sut.fn.startNewForm).toHaveBeenCalled();
                });
            });
        });

    });
});