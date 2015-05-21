/**
 * Created by kevin on 10/28/14.
 */
define([
    'modules/account/FakeDatabase'
], function (FakeDatabase) {
    describe("FakeDatabase", function () {

        var DefaultTableList = [
            {
                columnKey: "following",
                name: "Seguir"
            },
            {
                columnKey: "name",
                name: "Nombre"
            },
            {
                columnKey: "class",
                name: "Class."
            },
            {
                columnKey: "contactInfo.validAddress",
                name: "/images/validAddress.png"
            },
            {
                columnKey: "contactInfo.country",
                name: "País"
            },
            {
                columnKey: "contactInfo.city",
                name: "Ciudad"
            },
            {
                columnKey: "contactInfo.address",
                name: "Dirección"
            },
            {
                columnKey: "contactInfo.phoneNumber",
                name: "Numero tel."
            },
            {
                columnKey: "modified",
                name: "Modificación"
            },
            {
                columnKey: "responsible.name",
                name: "Responsable"
            }
        ];

        it("should return a default table fields list", function () {
            var db = FakeDatabase.newInstance();
            var expected = {success: true, data: DefaultTableList};
            var result = db.getAccountFields();

            expect(result).toEqual(expected);
        });

        it("should register a new column in the table fields list", function () {
            var db = FakeDatabase.newInstance();
            var newColumn = {columnKey: "someNewColumn", name: "Some New Column"};
            var expected = {success: true, data: DefaultTableList.concat(newColumn)};

            db.putAccountField(newColumn);
            expect(db.getAccountFields()).toEqual(expected);
        });

        it("should delete an existing column in the table fields list", function () {
            var db = FakeDatabase.newInstance();
            var columnToRemove = "responsible.name";
            var expected = {
                success: true, data: DefaultTableList.filter(function (k) {
                    return k.columnKey != columnToRemove;
                })
            };

            db.deleteAccountField(columnToRemove);
            expect(db.getAccountFields()).toEqual(expected);
        });

        var dataProvider = [
            {
                offset: 0, limit: 1, filters: [], expected: {
                success: true, data: [{
                    "id": undefined,
                    "following": true,
                    "name": "Apple",
                    "class": "C",
                    "contactInfo": {
                        "validAddress": true,
                        "country": "USA",
                        "city": "Cupertino",
                        "address": "Fake Avenue, 656",
                        "phoneNumber": "(000) 000 000"
                    },
                    "modified": 1316908806,
                    "responsible": {
                        "name": "Carlos Zamorano"
                    }
                }], merge: false
            }
            },
            {
                offset: 1, limit: 1, filters: [], expected: {
                success: true, data: [{
                    "id": undefined,
                    "following": false,
                    "name": "Microsoft",
                    "class": "C",
                    "contactInfo": {
                        "validAddress": true,
                        "country": "USA",
                        "city": "Unknown",
                        "address": "Fake Avenue, 656",
                        "phoneNumber": "(000) 000 000"
                    },
                    "modified": 1348790400,
                    "responsible": {
                        "name": "Carlos Zamorano"
                    }
                }], merge: false
            }
            },
            {
                offset: 0, limit: 200, filters: [{"columnKey": "name", "value": "osoft"}], expected: {
                success: true, data: [{
                    "id": undefined,
                    "following": false,
                    "name": "Microsoft",
                    "class": "C",
                    "contactInfo": {
                        "validAddress": true,
                        "country": "USA",
                        "city": "Unknown",
                        "address": "Fake Avenue, 656",
                        "phoneNumber": "(000) 000 000"
                    },
                    "modified": 1348790400,
                    "responsible": {
                        "name": "Carlos Zamorano"
                    }
                }], merge: false
            }
            }
        ];

        dataProvider.forEach(function (test) {
            it("should get a basic response of a element", function () {
                var db = FakeDatabase.newInstance();
                var result = db.getAccounts({
                        order: {field: 'name', direction: 'asc', offset: test.offset, limit: test.limit},
                        filters: test.filters
                    }
                );
                expect(result).toEqual(test.expected);
            });
        });

        describe("toggleEnvironment", function () {
            describe("toggling an environment", function () {
                var sut;
                beforeEach(function () {
                    sut = FakeDatabase.newInstance([],[],[],[],[],[]);
                });

                it("should turn 'selected' to false if it's selected", function () {
                    var toToggle = {id: 1, selected: true};
                    sut.currentEnvironment = [{
                        id: 1,
                        selected: true
                    }, {
                        id: 2,
                        selected: true
                    }, {
                        id: 3,
                        selected: false
                    }];
                    sut.toggleEnvironment(toToggle);
                    expect(sut.currentEnvironment).toEqual([{
                        id: 1,
                        selected: false
                    }, {
                        id: 2,
                        selected: true
                    }, {
                        id: 3,
                        selected: false
                    }]);
                    expect(toToggle.selected).toBe(false);
                });

                it("should turn 'selected' to true if it's not selected", function () {
                    var toToggle = {id: 3};
                    sut.currentEnvironment = [{
                        id: 1,
                        selected: true
                    }, {
                        id: 2,
                        selected: true
                    }, {
                        id: 3,
                        selected: false
                    }];
                    sut.toggleEnvironment(toToggle);
                    expect(sut.currentEnvironment).toEqual([{
                        id: 1,
                        selected: true
                    }, {
                        id: 2,
                        selected: true
                    }, {
                        id: 3,
                        selected: true
                    }]);
                    expect(toToggle.selected).toBe(true);
                });
            });
        });
    });
});