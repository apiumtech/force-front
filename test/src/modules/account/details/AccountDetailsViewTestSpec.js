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
        });

        it("should call presenter's show method on show()", function () {
            sut.fn.loadAccountData = jasmine.createSpy();
            sut.show();
            expect(sut.presenter.show).toHaveBeenCalledWith(sut);
            expect(sut.fn.loadAccountData).toHaveBeenCalled();
        });

        ["onFollowToggled", "onAccountUpdated"].forEach(function (method) {
            describe(method, function () {
                it("should reload account data", function () {
                    spyOn(sut.fn, 'loadAccountData');
                    sut[method]();
                    expect(sut.fn.loadAccountData).toHaveBeenCalled();
                });
            });
        })

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
                name: "data from server",
                contactInfo: {
                    latitude: 0.981,
                    longitude: -1.023
                }
            };
            it("should assign data to accountData scope", function () {
                sut.onAccountLoaded(data);
                expect(sut.$scope.accountData).toEqual(data);
            });

            it("should update the map with new location", function () {
                sut.onAccountLoaded(data);
                expect(sut.updateMap).toHaveBeenCalledWith(data.contactInfo.latitude, data.contactInfo.longitude, data.name);
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
                sut.onAccountDeleted();
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
                relatedCompany: {
                    name: "mock company",
                    type: "mock company type"
                }
            };
            it("shoulld call appendCompany function", function () {
                sinon.stub(sut, 'appendCompany');
                sut.onRelatedCompanySaved(data);
                expect(sut.appendCompany).toHaveBeenCalledWith(data.relatedCompany);
            });
        });

        describe('appendCompany', function () {
            var company = {
                name: "name",
                type: "type"
            };
            it("should cal removeEffects function", function () {
                sinon.stub(sut, "removeEffects");
                sut.appendCompany(company);
                expect(sut.removeEffects).toHaveBeenCalled();
            });
        });

    });

});