/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailViews", function () {
    var AccountDetailsView = app.getView('views/accountDetails/AccountDetailsView');

    var sut, model, presenter, modalService;

    beforeEach(function () {
        model = {};
        modalService = {};
        presenter = {
            show: jasmine.createSpy(),
            showError: jasmine.createSpy()
        };
        sut = AccountDetailsView.newInstance({}, modalService, model, presenter, null, null, false, false).getOrElse(throwInstantiateException(AccountDetailsView));
    });

    it("should call presenter's show method on show()", function () {
        sut.fn.loadAccountData = jasmine.createSpy();
        sut.show();
        expect(sut.presenter.show).toHaveBeenCalledWith(sut, model);
        expect(sut.fn.loadAccountData).toHaveBeenCalled();
    });

    it("should call presenter's showError method on showError()", function () {
        sut.showError("some error");
        expect(sut.presenter.showError).toHaveBeenCalledWith("some error");
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
})
;