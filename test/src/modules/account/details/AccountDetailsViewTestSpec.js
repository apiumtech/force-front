/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/details/AccountDetailsView',
    'modules/account/details/AccountDetailsPresenter',
    'shared/services/ModalDialogAdapter',
    'shared/services/GoogleMapService',
    'shared/services/PopoverAdapter',
    'angular'
], function (AccountDetailsView, AccountDetailsPresenter, ModalDialogAdapter, GoogleMapService, PopoverAdapter, angular) {
    'use strict';
    describe("AccountDetailViews", function () {

        var sut, scope, element, presenter, mapService, popoverService, modalDialogAdapter;

        beforeEach(function () {
            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });

            element = angular.element('<div/>');

            scope.$modal = {
                open: sinon.stub()
            };
            modalDialogAdapter = mock(ModalDialogAdapter);
            presenter = mock(AccountDetailsPresenter);
            mapService = mock(GoogleMapService);
            popoverService = mock(PopoverAdapter);
            sut = new AccountDetailsView(scope, element, presenter, mapService, popoverService, modalDialogAdapter);
            sut.event.onLoadAccount = function(){};
        });

        it("should call presenter's show method on show()", function () {
            sut.show();
            expect(sut.presenter.show).toHaveBeenCalledWith(sut);
        });

        describe("configureEvents", function () {
            beforeEach(function () {
                sut.event.onLoadAccount = function () {
                };
                sut.show();
            });


            ["onFollowToggled", "onAccountUpdated"].forEach(function (method) {
                describe(method, function () {
                    it("should reload account data", function () {
                        spyOn(sut.fn, 'loadAccountData');
                        sut[method]();
                        expect(sut.fn.loadAccountData).toHaveBeenCalled();
                    });
                });
            });

            describe("fn.initMap", function () {
                it("should createMap", function () {
                    var mapValue = {map: 'googleMap'};
                    spyOn(sut.mapService, 'createMap').and.returnValue(mapValue);
                    sut.fn.initMap();
                    expect(sut.mapService.createMap).toHaveBeenCalled();
                    expect(sut.data.map).toEqual(mapValue);
                });
            });

            describe('fn.deleteAccount', function () {
                it("should call modalDialogAdapter's confirm method with the correct params", function () {
                    var title = "title";
                    var message = "message";
                    spyOn(sut, 'handleDeleteRequest');
                    spyOn(window, 'doNothing');
                    sut.fn.deleteAccount(title, message);
                    expect(sut.modalDialogAdapter.confirm).toHaveBeenCalledWith(title, message, jasmine.any(Function), window.doNothing);
                });
                it("should execute handleDeleteRequest when the confirmation confirmed", function () {
                    var title = "title";
                    var message = "message";
                    spyOn(sut, 'handleDeleteRequest');
                    spyOn(window, 'doNothing');

                    spyOn(modalDialogAdapter, 'confirm').and.callFake(function (title, message, actionConfirmCallback, actionRejectCallback) {
                        actionConfirmCallback();
                    });
                    sut.fn.deleteAccount(title, message);
                    expect(sut.handleDeleteRequest).toHaveBeenCalled();
                });
            });

            describe('fn.addCompany', function () {

                var promise = {
                    'obj': 123
                };

                var paramDialog = {
                    result: {
                        then: function (b) {
                            b(promise);
                        }
                    }
                };

                beforeEach(function () {
                    scope.$modal.open.returns(paramDialog);
                    sinon.stub(sut, 'handleAddCompanyRequest');
                    sut.fn.addCompany();
                });

                it("should open the dialog", function () {
                    expect(scope.$modal.open).toHaveBeenCalled();
                });

                it("should call handleAddCompanyRequest function after dialog dismissed", function () {
                    expect(sut.handleAddCompanyRequest).toHaveBeenCalledWith({'obj': 123});
                });

            });

            describe("fn.loadAccountData", function () {
                it("should fire event onLoadAccount", function () {
                    sut.event.onLoadAccount = jasmine.createSpy();
                    sut.fn.loadAccountData();
                    expect(sut.event.onLoadAccount).toHaveBeenCalled();
                });
            });

            describe("fn.toggleFollow", function () {
                it("should fire event onToggleFollow", function () {
                    sut.event.onToggleFollow = jasmine.createSpy();
                    sut.fn.toggleFollow();
                    expect(sut.event.onToggleFollow).toHaveBeenCalled();
                });
            });

            describe("fn.startEditEmail", function () {
                beforeEach(function () {
                    sut.fn.editingEmails = {
                        "0": "have-value",
                        "1": "have-v-alue",
                        "3": "have--va-lue"
                    };
                });
                it("should add the value to editingEmails list", function () {
                    sut.fn.startEditEmail(2, "newValue");
                    expect(sut.fn.editingEmails).toEqual({
                        "0": "have-value",
                        "1": "have-v-alue",
                        "2": "newValue",
                        "3": "have--va-lue"
                    });
                });
            });

            describe("fn.isEditingEmail", function () {
                [{
                    real: {
                        "1": "abc"
                    },
                    toGet: 1,
                    expected: true
                }, {
                    real: {
                        "1": "abc"
                    },
                    toGet: 3,
                    expected: false
                }].forEach(function (testCase) {
                        describe("getting index " + testCase.toGet, function () {
                            it("should return " + testCase.expected, function () {
                                sut.fn.editingEmails = testCase.real;
                                var actual = sut.fn.isEditingEmail([testCase.toGet]);
                                expect(actual).toEqual(testCase.expected);
                            });
                        });
                    });
            });

            describe("fn.cancelEditingEmail", function () {
                beforeEach(function () {
                    sut.fn.editingEmails = {
                        "0": "have-value",
                        "1": "have-v-alue",
                        "3": "have--va-lue"
                    };

                    sut.fn.loadAccountData = jasmine.createSpy();
                });
                it("should turn the email editing to false by remove it from the editingEmails object", function () {
                    sut.fn.cancelEditingEmail(3);
                    expect(sut.fn.editingEmails).toEqual({
                        "0": "have-value",
                        "1": "have-v-alue"
                    });
                });

                it("should call loadAccountData to reload the data", function () {
                    sut.fn.cancelEditingEmail(3);
                    expect(sut.fn.loadAccountData).toHaveBeenCalled();
                });
            });

            describe("fn.finishEditingEmail", function () {
                beforeEach(function () {
                    sut.fn.editingEmails = {
                        "0": "have-value",
                        "1": "have-v-alue",
                        "3": "have--va-lue"
                    };
                    sut.accountData = {
                        emails: ["have-value", "have-v-alue", "some-other-value", "have--va-lue"]
                    };
                    sut.event.onUpdateEmail = jasmine.createSpy();
                });

                it("should turn the email editing to false by remove it from the editingEmails object", function () {
                    sut.fn.finishEditingEmail(3, "newValue");
                    expect(sut.fn.editingEmails).toEqual({
                        "0": "have-value",
                        "1": "have-v-alue"
                    });
                });

                it("should call onUpdateEmail to reload the data", function () {
                    sut.fn.finishEditingEmail(3, "newValue");
                    expect(sut.event.onUpdateEmail).toHaveBeenCalledWith(sut.accountData);
                });
            });

            describe('fn.loadRelatedContact', function () {
                it('should fire onLoadingRelatedContact event', function () {
                    sut.accountId = 123;
                    sut.event = {
                        onLoadingRelatedContact: sinon.stub()
                    };
                    sut.fn.loadRelatedContact();
                    expect(sut.event.onLoadingRelatedContact).toHaveBeenCalledWith(123);
                });
            });

            describe('fn.loadRelatedCompany', function () {
                it('should fire onLoadingRelatedCompany event', function () {
                    sut.accountId = 123;
                    sut.event = {
                        onLoadingRelatedCompany : sinon.stub()
                    };
                    sut.fn.loadRelatedCompany();
                    expect(sut.event.onLoadingRelatedCompany).toHaveBeenCalledWith(123);
                });
            });
        });

        describe("onAccountLoaded()", function () {
            beforeEach(function () {
                spyOn(sut, 'updateMap');
            });

            it("should throw exception if the data from server is null", function () {
                var errorMsg = "Error while loading data from server";
                expect(function () {
                    sut.onAccountLoaded(null);
                }).toThrow(new Error(errorMsg));
            });

            var data = {
                data:
                {
                    name: "data from server",
                    contactInfo: {
                        latitude: 0.981,
                        longitude: -1.023
                    }
                }
            };
            beforeEach(function () {
                sut.onAccountLoaded(data);
            });
            it("should assign data to accountData scope", function () {
                expect(sut.$scope.accountData).toEqual(data.data);
            });

            it('should extract previousAccountId from data', function () {
                expect(sut.$scope.accountData.previousAccountId).toEqual(data.previousAccountId);
            });

            it('should extract nextAccountId from data', function () {
                expect(sut.$scope.accountData.nextAccountId).toEqual(data.nextAccountId);
            });

            it("should update the map with new location", function () {
                expect(sut.updateMap).toHaveBeenCalledWith(sut.accountData.contactInfo.latitude, sut.accountData.contactInfo.longitude, sut.accountData.name);
            });
        });
        describe("updateMap", function () {
            var latLon = {lat: 0, long: 0};
            var marker = {
                setMap: function () {
                }
            };
            var name = 'microsoft';
            beforeEach(function () {
                sut.data.map = {
                    setCenter: jasmine.createSpy()
                };
                spyOn(sut.mapService, 'getLatLng').and.returnValue(latLon);
                spyOn(sut.mapService, 'createMarker').and.returnValue(marker);
                spyOn(marker, 'setMap');
            });

            it("should createMarker with mapService", function () {
                sut.updateMap(10, 10, name);
                expect(sut.mapService.createMarker).toHaveBeenCalledWith({
                    position: latLon,
                    title: name
                });
            });

            it("should set the marker to the map", function () {
                sut.updateMap(10, 10, name);
                expect(marker.setMap).toHaveBeenCalledWith(sut.data.map);
            });

            it("should set the map to center", function () {
                sut.updateMap(10, 10, name);
                expect(sut.data.map.setCenter).toHaveBeenCalledWith(latLon);
            });
        });

        describe('handleDeleteRequest', function () {
            describe('accountId is undefined', function () {
                it("should throw accountId undefined error", function () {
                    sut.event.onDeleteAccount = sinon.stub();
                    sut.accountId = undefined;
                    expect(function () {
                        sut.handleDeleteRequest();
                    }).toThrow(new Error('AccountID is undefined'));
                });
            });

            describe('accountId is defined', function () {
                beforeEach(function () {
                    sut.accountId = 123;
                    sut.event.onDeleteAccount = sinon.stub();
                    sinon.stub(sut, 'onAccountDeleted');
                    spyOn(sut.event, 'onDeleteAccount').and.callFake(function (reportId, callback) {
                        callback();
                    });
                    sut.handleDeleteRequest();
                });
                it("should fire onDeleteAccount event", function () {
                    expect(sut.event.onDeleteAccount).toHaveBeenCalledWith(123, jasmine.any(Function));
                });
                it("should call onAccountDeleted upon success of onDeleteAccount event", function () {
                    expect(sut.onAccountDeleted).toHaveBeenCalled();
                });
            });

        });

        describe('onAccountDeleted', function () {
            it("should show notification and redirect to account list page", function () {
                var title = "title";
                var message = 'message';
                spyOn(sut, 'redirectToAccountList');
                spyOn(modalDialogAdapter, 'notify').and.callFake(function (title, message, actionConfirmCallback) {
                });
                var response = {
                  message: "Server message"
                };
                sut.onAccountDeleted(response);
                expect(sut.redirectToAccountList).toHaveBeenCalled();
            });
        });

        describe('handleAddCompanyRequest', function () {
            var data;
            beforeEach(function () {
                data = {
                    relatedCompany: {
                        name: "mock company",
                        type: "mock company type"
                    }
                };
                sut.accountId = 123;
                sut.event.onSaveRelatedCompany = sinon.stub();
                sinon.stub(sut, 'onRelatedCompanySaved');
                spyOn(sut.event, 'onSaveRelatedCompany').and.callFake(function (accountId, relatedCompany, callback) {
                    callback();
                });
                sut.handleAddCompanyRequest(data);
            });

            it("should fire onSaveRelatedCompany event", function () {
                expect(sut.event.onSaveRelatedCompany).toHaveBeenCalledWith(123, data.relatedCompany, jasmine.any(Function));
            });

            it("should call onRelatedCompanySaved upon success of onSaveRelatedCompany event", function () {
                expect(sut.onRelatedCompanySaved).toHaveBeenCalled();
            });

        });

        describe('onRelatedCompanySaved', function () {
            var data = {
                    name: "mock company",
                    type: "mock company type"
            };
            beforeEach(function () {
                sinon.stub(sut, 'reloadRelatedCompany');
                spyOn(sut.modalDialogAdapter, 'notify').and.callFake(function (title, message, resolveObject, callBackWhenClose) {
                    callBackWhenClose();
                });
                sut.onRelatedCompanySaved(data);
            });
            it("should show a notification dialog", function () {
                expect(sut.modalDialogAdapter.notify).toHaveBeenCalled();
            });
            it("should call reloadRelatedCompany function after a notification dialog", function () {
                expect(sut.reloadRelatedCompany).toHaveBeenCalledWith(data);
            });
        });

        describe('onRelatedContactLoaded', function () {
            var data = [
                {"value": "01"}, {"value": "02"}, {"value": "03"}
            ];
            beforeEach(function () {
                sinon.stub(sut, "loadNewCreatedContactIfAny");
                sut.accountData = {};
                sut.onRelatedContactLoaded(data);
            });
            it('should assign the returned data to accountData.relatedContacts', function () {
                expect(sut.relatedContacts).toEqual(data);
            });
            it('should call loadNewCreatedContactIfAny', function () {
                expect(sut.loadNewCreatedContactIfAny).toHaveBeenCalled();
            });
        });

        describe('onRelatedCompanyLoaded', function () {
            var data = [
                {"value": "01"},{"value": "02"},{"value": "03"}
            ];
            beforeEach(function () {
                sut.accountData = {};
            });
            it('should assign the returned data to accountData.relatedCompanies', function () {
                sut.onRelatedCompanyLoaded(data);
                expect(sut.relatedCompanies).toEqual(data);
            });
            describe('no newCompany is added', function () {
                it('should not call appendCompany function', function () {
                    sut.newCompany = null;
                    sut.onRelatedCompanyLoaded(data);
                    expect(sut.appendCompany).not.toHaveBeenCalled();
                });
            });
            describe('a newCompany is added', function () {
                beforeEach(function () {
                    sut.newCompany = {
                        success: true,
                        message: 1
                    };
                    sinon.stub(sut, "appendCompany");
                    sut.onRelatedCompanyLoaded(data);
                });
                it('should call appendCompany function with new company information in the right format', function () {
                    expect(sut.appendCompany).toHaveBeenCalledWith({
                        message: {
                            message: 1
                        }
                    });
                });
                it('should set sut.newCompany to undefined', function () {
                    expect(sut.newCompany).toBeUndefined();
                });
            });
        });

        describe('appendCompany', function () {
            var newCompany = {
                message: {
                    message: 1
                }
            };
            var companies = [{"company": "name 01"},{"company": "name 02"}];
            it('should call appendNewElement function', function () {
                sut.relatedCompanies= companies;
                sinon.stub(sut, "appendNewElement");
                sut.appendCompany(newCompany);
                expect(sut.appendNewElement).toHaveBeenCalledWith(companies, [newCompany]);
            });
        });

        describe('appendContact', function () {
            var newContacts = [{
                message: {
                    message: 1
                }
            },{
                message: {
                    message: 3
                }
            }];
            var contacts = [{"contact": "name 01"},{"contact": "name 02"}];
            it('should call appendNewElement function', function () {
                sut.relatedContacts = contacts;
                sinon.stub(sut, "appendNewElement");
                sut.appendContact(newContacts);
                expect(sut.appendNewElement).toHaveBeenCalledWith(contacts, newContacts);
            });
        });

        describe('appendNewElement', function () {
            var inputElements = [
                {
                    id: 1,
                    name: "Element 1"
                },
                {
                    id: 2,
                    name: "Element 2"
                },
                {
                    id: 3,
                    name: "Element 3"
                },
                {
                    id: 4,
                    name: "Element 4"
                }
            ];
            var expected = [
                {
                    id: 1,
                    name: "Element 1",
                    recent: true
                },
                {
                    id: 2,
                    name: "Element 2"
                },
                {
                    id: 3,
                    name: "Element 3",
                    recent: true
                },
                {
                    id: 4,
                    name: "Element 4"
                }
            ];
            var newElements = [
                {
                    message: {
                        message: 1
                    }
                },
                {
                    message: {
                        message: 3
                    }
                }
            ];

            beforeEach(function () {
                sut.appendNewElement(inputElements, newElements, angular.element('<div/>'));
            });

            it('should modify element status to apply effects', function () {
                expect(inputElements).toEqual(expected);
            });
        });

        describe('removeEffects', function () {
            var elements = [
                {id: 1, name: "name 01"},{id: 2, name: "name 02"}
            ];
            var expected = [
                {id: 1, name: "name 01", added: true},{id: 2, name: "name 02", added: true}
            ];

            it('should modify element status to remove effects', function () {
                sut.removeEffects(elements);
                expect(elements).toEqual(expected);
            });

        });

    });

});